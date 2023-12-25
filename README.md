# a.betaev.pub site

## roadmap

- [x] authenticate agains github app
- [x] thin integration layer github-graphql -> UI renderer
- [ ] minimal design
- [ ] articles ("announcement" categories)
  - [ ] rendering markdown
    - [ ] markdown tables to graphics
    - [ ] diagrams
  - [ ] comments
- [ ] forum
      discussions of type "open-ended discussion", user are allowed to create their topics
      all same features as in articles
- [ ] configuration
  - [ ] github user/repo
  - [ ] managing config through git
- [ ] deployment
  - [ ] pre-rendering on deployment (to avoid necessity of authentication)


## development

### requirements

* bun >=1.0
* container runtime, one of:
  - docker compose plugin >=2.22 - **supports hot reload**
  - podman compose


```bash
# develop
bun run dev
# deploy
bun run deploy
```