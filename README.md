# para*site*

## roadmap

### functional

- [x] authenticate agains github app
- [x] thin integration layer github-graphql -> UI renderer
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
- [ ] rtc connectivity
  - [ ] invite links
  - [ ] roster

### technical

- [ ] service infrastructure
  - [ ] worker services
    - [ ] account
    - [ ] session
- [ ] design system
  - [ ] layouts
    - [ ] singular
    - [ ] plural
  - [ ] components
    - [ ] input
      - [ ] text
      - [ ] date
      - [ ] action
    - [ ] output
      - [ ] text
      - [ ] date
      - [ ] header
      - [ ] markdown


## development

### requirements

* bun >=1.0
* docker compose plugin >=2.22

### environment

```bash
# develop
bun run dev
```