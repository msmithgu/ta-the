# Take-Home Exercise

## Overview

With this exercise I focused on creating a clear, visual deliverable: a dynamically generated, downloadable service map.

Given the limited time assigned, I prioritized core functionality and visualization over extensive testing or additional features. However, I'd be excited to discuss potential enhancements or ideas during a conversation.

## Approach

I have prior experience working on projects that involve dynamic SVG generation, including:

  - [graphl](https://github.com/msmithgu/graphl/): A simple domain-specific language for describing service architecture
  - [dynamic designs](https://msmithgu.github.io/dd/display-stand/): A tool for generating parameter-controlled SVG design files for laser cutting.
  - Wärtsilä: While at Wärtsilä, I worked on dynamically generating control maps for power plants, and also many many many different sorts of graphs and visualizations.

Building on these experiences, I applied similar techniques to this project.

## Opportunities for Expansion

The current implementation represents a foundational step, but there are near-unlimited opportunities for enhancing dynamic UX and creating engaging animated visualizations. Tools like D3.js offer exciting possibilities, such as:

  - Interactive, data-driven animations to explore service relationships.
  - Dynamic filters and transitions for better visual clarity.
  - Advanced features like zooming, panning, and real-time updates.

I’d be thrilled to discuss these ideas and collaborate on turning them into reality.

## Next Steps

Though the current implementation focuses on the basics, there’s significant room for testing, refinement, and feature expansion. I look forward to discussing:

  - Potential use cases for this tool.
  - Features or improvements to enhance usability or functionality.
  - Alternative approaches to SVG generation or service map design.

Feel free to reach out with questions or feedback!

To serve locally:

    python3 -m http.server 8080 --bind 127.0.0.1 --directory .