import svgbob from "bob-wasm";
import type { Code, Node, Parent } from "mdast";
import rehypeParse from "rehype-parse";
import { remark } from "remark";
import { optimize } from "svgo";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

type Options = { keepStyle: boolean }
const plugin: Plugin<[Options], Node> = (options?: Options) => async (node) => {
  const remarkInstance = remark().use(rehypeParse, { fragment: true, space: "svg" });
  await svgbob.loadWASM()
  visit(
    node,
    { type: "code", lang: "bob" },
    (node: Code, index: number, parent: Parent) => {
      const { data: value } = optimize(
        svgbob.render(node.value)
      )
      const hChildren = remarkInstance.parse(value).children
      if (!options?.keepStyle) {
        if (hChildren[0]?.type === "element") {
          hChildren[0].children.splice(hChildren[0].children.findIndex(
            child => child.type === "element" && child.tagName === "style"
          ), 1)[0]
        } else {
          throw `something's wrong`
        }
      }
      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [{ type: "html", value }],
        data: { hChildren }
      })
    }
  );
};

export default plugin