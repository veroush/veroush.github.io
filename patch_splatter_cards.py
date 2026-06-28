from pathlib import Path

path = Path(r'c:\Projects\Portfolio\index.html')
text = path.read_text(encoding='utf-8')

# About card replacement
about_marker = '        <!-- ABOUT ME -->'
about_span = '<span class="splatter-card__content splatter-card__content--about">'
about_start = text.index(about_marker)
about_span_index = text.index(about_span, about_start)
about_svg_end = text.rfind('</svg>', about_start, about_span_index)
about_svg_block = text[about_start:about_svg_end + len('</svg>')]

new_about_svg = '''        <!-- ABOUT ME -->
        <a class="splatter-card" href="./about.html" aria-label="About Me - Get to know me">
          <svg class="splatter-card__blob" viewBox="40 -20 400 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g filter="url(#spray-halo)" opacity="0.16" fill="#C0392B">
              <path transform="translate(200 200) scale(2.5)" d="M29.5,-58.7C34.2,-48.4,31.1,-32.3,41.1,-21.5C51.2,-10.8,74.5,-5.4,81.4,3.9C88.2,13.3,78.6,26.5,64.6,30.5C50.5,34.5,32.2,29.2,20.7,32.2C9.2,35.3,4.6,46.8,-0.1,46.9C-4.7,47,-9.4,35.7,-17.7,30.8C-26,25.9,-37.9,27.3,-43.2,23.2C-48.6,19.1,-47.5,9.6,-52.3,-2.8C-57.1,-15.1,-67.7,-30.2,-60.1,-30.4C-52.5,-30.6,-26.6,-16,-13.6,-21.4C-0.5,-26.8,-0.3,-52.3,6.1,-62.8C12.4,-73.4,24.8,-69,29.5,-58.7Z"/>
            </g>
            <g filter="url(#spray-soften)" opacity="0.30" fill="#C0392B">
              <circle cx="78" cy="92" r="28"/>
              <circle cx="318" cy="70" r="24"/>
              <circle cx="188" cy="210" r="22"/>
            </g>
            <g opacity="0.35" fill="#C0392B" filter="url(#spray-particle)">
              <use href="#spray-dot" x="70" y="94" transform="scale(1.7)"/>
              <use href="#spray-dot" x="332" y="128" transform="scale(1.2)"/>
              <use href="#spray-splat" x="210" y="208" transform="scale(0.8)"/>
            </g>
            <g fill="#C0392B" filter="url(#spray-rough)">
              <path transform="translate(200 200) scale(2.5)" d="M29.5,-58.7C34.2,-48.4,31.1,-32.3,41.1,-21.5C51.2,-10.8,74.5,-5.4,81.4,3.9C88.2,13.3,78.6,26.5,64.6,30.5C50.5,34.5,32.2,29.2,20.7,32.2C9.2,35.3,4.6,46.8,-0.1,46.9C-4.7,47,-9.4,35.7,-17.7,30.8C-26,25.9,-37.9,27.3,-43.2,23.2C-48.6,19.1,-47.5,9.6,-52.3,-2.8C-57.1,-15.1,-67.7,-30.2,-60.1,-30.4C-52.5,-30.6,-26.6,-16,-13.6,-21.4C-0.5,-26.8,-0.3,-52.3,6.1,-62.8C12.4,-73.4,24.8,-69,29.5,-58.7Z"/>
            </g>
            <g fill="#C0392B" filter="url(#spray-drip-soft)" opacity="0.95">
              <use href="#spray-drip" x="186" y="318" transform="scale(1.1)"/>
              <use href="#spray-drip" x="238" y="326" transform="scale(0.9)"/>
            </g>
          </svg>
'''

text = text[:about_start] + new_about_svg + text[about_svg_end + len('</svg>'):]

# Projects card replacement
proj_marker = '        <!-- PROJECTS -->'
proj_span = '<span class="splatter-card__content splatter-card__content--projects">'
proj_start = text.index(proj_marker)
proj_span_index = text.index(proj_span, proj_start)
proj_svg_end = text.rfind('</svg>', proj_start, proj_span_index)

new_proj_svg = '''        <!-- PROJECTS -->
        <a class="splatter-card" href="./work.html" aria-label="Projects - See what I've built">
          <svg class="splatter-card__blob" viewBox="-20 -10 440 490" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g filter="url(#spray-halo)" opacity="0.16" fill="#C0392B">
              <path transform="translate(200 200) scale(2.5)" d="M40.8,-70.3C49.2,-65.8,49.9,-47.5,49.3,-33.5C48.8,-19.5,46.9,-9.7,47.5,0.3C48,10.4,51.1,20.8,46.4,25.7C41.7,30.6,29.4,30,20.3,38.6C11.3,47.2,5.7,64.9,-2.9,69.9C-11.4,74.9,-22.8,67.1,-28.6,56.7C-34.4,46.2,-34.5,33.1,-37.9,23.2C-41.3,13.3,-47.8,6.7,-52.5,-2.7C-57.1,-12,-59.7,-24,-53,-28.2C-46.4,-32.4,-30.5,-28.8,-20.1,-32.3C-9.7,-35.7,-4.9,-46.2,5.7,-56C16.2,-65.8,32.3,-74.9,40.8,-70.3Z"/>
            </g>
            <g filter="url(#spray-soften)" opacity="0.30" fill="#C0392B">
              <circle cx="88" cy="100" r="24"/>
              <circle cx="320" cy="90" r="22"/>
              <circle cx="190" cy="220" r="20"/>
            </g>
            <g opacity="0.38" fill="#C0392B" filter="url(#spray-particle)">
              <use href="#spray-dot" x="82" y="102" transform="scale(1.6)"/>
              <use href="#spray-dot" x="292" y="145" transform="scale(1.25)"/>
              <use href="#spray-splat" x="168" y="220" transform="scale(0.85)"/>
            </g>
            <g fill="#C0392B" filter="url(#spray-rough)">
              <path transform="translate(200 200) scale(2.5)" d="M40.8,-70.3C49.2,-65.8,49.9,-47.5,49.3,-33.5C48.8,-19.5,46.9,-9.7,47.5,0.3C48,10.4,51.1,20.8,46.4,25.7C41.7,30.6,29.4,30,20.3,38.6C11.3,47.2,5.7,64.9,-2.9,69.9C-11.4,74.9,-22.8,67.1,-28.6,56.7C-34.4,46.2,-34.5,33.1,-37.9,23.2C-41.3,13.3,-47.8,6.7,-52.5,-2.7C-57.1,-12,-59.7,-24,-53,-28.2C-46.4,-32.4,-30.5,-28.8,-20.1,-32.3C-9.7,-35.7,-4.9,-46.2,5.7,-56C16.2,-65.8,32.3,-74.9,40.8,-70.3Z"/>
            </g>
            <g fill="#C0392B" filter="url(#spray-drip-soft)" opacity="0.95">
              <use href="#spray-drip" x="176" y="330" transform="scale(1.05)"/>
              <use href="#spray-drip" x="242" y="340" transform="scale(0.9)"/>
            </g>
          </svg>
'''

text = text[:proj_start] + new_proj_svg + text[proj_svg_end + len('</svg>'):]
path.write_text(text, encoding='utf-8')
print('Updated index.html')
