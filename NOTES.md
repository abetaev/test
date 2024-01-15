# ui

## top-level

page flow:
```
flow

                                         .----------(back)----------.
      .---[logout]                      /                           /
     /                                  |     ,-------------->[view]--->[&logout]
     |    .->(authenticated)---.        v    /                      \
     v   /                      >--->[browse]--->[&logout]           *-*-*->[config view]
  [login]----->(anonymous)-----'             \
     ^   \                                    '-->[config browse]
     |    '->(create account)-.
     \                        /
      '----------------------'

```

model:
```
structure

[browse]e--->[article list]
                   |
                   v
[view]o------->[article]

```

# roadmap

## milestone 1

- account
  - anonymous
  - store config

- config
  - github [browse]
    - authentication
      - url
      - clientId
    - username
    - repository
    - tokens (access, refresh?; encrypted)

- homepage
  - github discussions
    - render list of discussions from specific category as an article
      category to be postable only by user (configured in github)
      - when article is selected it is rendered with comments form
        user may leave comments as a github account owner, these comments
        will be persisted in github's discussion via graphql API.

## milestone 2

...

<hr>

## milestone F

...

- p2p
  - libp2p?
  - signalling through relay
    (google app)

- config
  - github
    * ...
    - readonly category
    - postable category
  - content filter
  - browse history?

- homepage
  - content sources
    - github discussions
      * ...
      - render list of disscussions from alternative categories as an article;
        category should NOT be specific category which users cannot create new discussions
        - additionally to display articles (backed by discussions)
        - user should be able to create new articles (backed by discussions)
    - filesystem
      (content directory during build)
    - dht `- - ->` p2p
  - content filtering
  - content addressing (ipfs?)


...

# ideas

## github browser

github browser with intuitive interface swapping between branches for particular files

i.e. a tree displayed as svg with ability to view files and then their branching embedded into tree

```
flow

                          .->{dirname}
                         /
             .->[dirname]--->{filename}
            /
[parent dir]               .->"main"
            \             /
             '->[filename]--->{branchname}
                          \
                           '->{tag name}

```

## diagrams to svgs

like svgbob, but more oriented into diagramming. 

example:

- visualize the diagram from above as colorful? scalable? interactive? SVG.

- or the diagram from below

```
structure

.- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -.
! (#Comments| are in round  $      (#Formatting| is preformed $   ! groups encapsulate!
!  brackets. New lines are  $        using special characters:$   '- - - - - - - - - -!
!  optional but to render in$        - \# - bold              $                       !
!  SVG need to be preceeded $ -*-*-  - \$ - clear formatting  $                       !
!  with \$ sign. User can   $        -      and new line      $                       !
!  escape special characters$        - \/ - italic font       $                       !
!  with backslash.           )       - \| - clear formatting  $                       !
!              |                     - and [other](...)        )                      !
!              *                                                                      !
!              |-*-*-(lines with "*" dotted)-*-(comments can be single-lined)         !
!              *                             |                                        !
!              |                             *-(lines can be shorter and longer)      !
! (#Brackets| are disposed  $                                                         !
!  in graphical structure on$                                                         !
!  the first line with -1   $                                                         !
!  offset to the following  $    (vertical lines with "!" are dashed, horizontal$  - -!
!  data and +1 after the    $     lines alternate dash and space for dashing     )    !
!  furthestletter vertically.)             !                                          !
!                                          !                                          !
'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'

.- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -.
!                                              ! concept design !
!             (/Plugin| #API (typescrypt))     '- - - - - - - - !
!                         *                                     !
!                         |                                     !
!   {/"App"$#"PARA"*site}--o)--{/"Plugin"$#MDML}                !
!             |                                                 !
!             *                                                 !
!             |                                                 !
!   (/#App$ to be expensible$                                   !
!    exposes /Plugin| #API|  )                                  !
!                                                               !
'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -' 

```

parse text and build model in d3?

## scalable cloud-based url shortner with adaptive pricing system

for money :)

## sharable content

whatever content is acquired by a user it can be shared with any user the acquisitor of content
is able to agree upon transfer of that content. i.e. user who actuired some content has complete
freedom of sharing that content with whomever they decide to share it.

- webrtc to share with peers
- use dht to share with all?