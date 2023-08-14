import hpccWasm from "@hpcc-js/wasm";
import type { Code, Node, Parent } from "mdast";
import rehypeParse from "rehype-parse";
import { remark } from "remark";
import { optimize } from "svgo";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const plugin: Plugin<[], Node> = () => async (node) => {
  const remarkInstance = remark().use(rehypeParse, { fragment: true, space: "svg" });
  const graphvizInstance = await hpccWasm.Graphviz.load()
  visit(
    node,
    { type: "code", lang: "dot" },
    (node: Code, index: number, parent: Parent) => {
      const { data: value } = optimize(
        graphvizInstance.layout(
          node.value,
          "svg",
          "dot"
        )
      )
      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [{ type: "html", value }],
        data: { hChildren: remarkInstance.parse(value).children }
      })
    }
  );
};


export default plugin