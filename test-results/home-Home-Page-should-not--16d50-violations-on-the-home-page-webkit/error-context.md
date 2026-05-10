# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home Page >> should not have any accessibility violations on the home page
- Location: tests/e2e/home.spec.ts:21:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -    1
+ Received  + 1083

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#84cc16",
+               "contrastRatio": 1.97,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#ffffff",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.97 (foreground color: #ffffff, background color: #84cc16, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<button type=\"submit\" class=\"focus:outline-none d...\" data-v-a5e1eb00=\"\">",
+                 "target": Array [
+                   "button[type=\"submit\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.97 (foreground color: #ffffff, background color: #84cc16, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<button type=\"submit\" class=\"focus:outline-none d...\" data-v-a5e1eb00=\"\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "button[type=\"submit\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#84cc16",
+               "contrastRatio": 1.97,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#ffffff",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.97 (foreground color: #ffffff, background color: #84cc16, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<button type=\"button\" class=\"focus:outline-none d...\" data-v-e161f4a1=\"\">",
+                 "target": Array [
+                   ".text-base",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.97 (foreground color: #ffffff, background color: #84cc16, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<button type=\"button\" class=\"focus:outline-none d...\" data-v-e161f4a1=\"\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-base",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+   Object {
+     "description": "Ensure the order of headings is semantically correct",
+     "help": "Heading levels should only increase by one",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",
+     "id": "heading-order",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "heading-order",
+             "impact": "moderate",
+             "message": "Heading order invalid",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Heading order invalid",
+         "html": "<h3 class=\"mb-3 font-bold text-gray-800 dark:text-gray-100 text-xl\" data-v-c9f83195=\"\">Senior Web Developer</h3>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".mb-3",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "best-practice",
+     ],
+   },
+   Object {
+     "description": "Ensure every HTML document has a lang attribute",
+     "help": "<html> element must have a lang attribute",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=playwright",
+     "id": "html-has-lang",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noLang",
+             },
+             "id": "has-lang",
+             "impact": "serious",
+             "message": "The <html> element does not have a lang attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   The <html> element does not have a lang attribute",
+         "html": "<html class=\"light\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.language",
+       "wcag2a",
+       "wcag311",
+       "TTv5",
+       "TT11.a",
+       "EN-301-549",
+       "EN-9.3.1.1",
+       "ACT",
+       "RGAAv4",
+       "RGAA-8.3.1",
+     ],
+   },
+   Object {
+     "description": "Ensure the document has a main landmark",
+     "help": "Document should have one main landmark",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
+     "id": "landmark-one-main",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [
+           Object {
+             "data": null,
+             "id": "page-has-main",
+             "impact": "moderate",
+             "message": "Document does not have a main landmark",
+             "relatedNodes": Array [],
+           },
+         ],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   Document does not have a main landmark",
+         "html": "<html class=\"light\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "best-practice",
+     ],
+   },
+   Object {
+     "description": "Ensure links have discernible text",
+     "help": "Links must have discernible text",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright",
+     "id": "link-name",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "has-visible-text",
+             "impact": "serious",
+             "message": "Element does not have text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix all of the following:
+   Element is in tab order and does not have accessible text
+
+ Fix any of the following:
+   Element does not have text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<a class=\"focus:outline-none f...\" data-v-a11a4c1f=\"\" href=\"https://www.linkedin...\" rel=\"noopener noreferrer\" target=\"_blank\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": null,
+             "id": "focusable-no-name",
+             "impact": "serious",
+             "message": "Element is in tab order and does not have accessible text",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           ".focus-visible\\:outline-0.p-1\\.5.hover\\:text-gray-900:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "has-visible-text",
+             "impact": "serious",
+             "message": "Element does not have text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix all of the following:
+   Element is in tab order and does not have accessible text
+
+ Fix any of the following:
+   Element does not have text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<a class=\"focus:outline-none f...\" data-v-a11a4c1f=\"\" href=\"https://github.com/h...\" rel=\"noopener noreferrer\" target=\"_blank\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": null,
+             "id": "focusable-no-name",
+             "impact": "serious",
+             "message": "Element is in tab order and does not have accessible text",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "a[href$=\"hendras1722\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "has-visible-text",
+             "impact": "serious",
+             "message": "Element does not have text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix all of the following:
+   Element is in tab order and does not have accessible text
+
+ Fix any of the following:
+   Element does not have text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<a class=\"focus:outline-none f...\" data-v-a11a4c1f=\"\" href=\"https://discordapp.c...\" rel=\"noopener noreferrer\" target=\"_blank\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": null,
+             "id": "focusable-no-name",
+             "impact": "serious",
+             "message": "Element is in tab order and does not have accessible text",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           ".focus-visible\\:outline-0.p-1\\.5.hover\\:text-gray-900:nth-child(3)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "has-visible-text",
+             "impact": "serious",
+             "message": "Element does not have text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "serious",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "serious",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "serious",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix all of the following:
+   Element is in tab order and does not have accessible text
+
+ Fix any of the following:
+   Element does not have text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute",
+         "html": "<a class=\"focus:outline-none f...\" data-v-a11a4c1f=\"\" href=\"https://www.instagra...\" rel=\"noopener noreferrer\" target=\"_blank\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": null,
+             "id": "focusable-no-name",
+             "impact": "serious",
+             "message": "Element is in tab order and does not have accessible text",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           ".focus-visible\\:outline-0.p-1\\.5.hover\\:text-gray-900:nth-child(4)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.name-role-value",
+       "wcag2a",
+       "wcag244",
+       "wcag412",
+       "section508",
+       "section508.22.a",
+       "TTv5",
+       "TT6.a",
+       "EN-301-549",
+       "EN-9.2.4.4",
+       "EN-9.4.1.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-6.2.1",
+     ],
+   },
+   Object {
+     "description": "Ensure all page content is contained by landmarks",
+     "help": "All page content should be contained by landmarks",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
+     "id": "region",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<a href=\"/\" class=\"font-bold text-2xl\" data-v-a54da7ff=\"\"><span class=\"dark:text-white\" data-v-a54da7ff=\"\">MSA</span></a>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".text-2xl",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<select value=\"en\" class=\"relative block w-ful...\" data-v-1437ce7f=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "select",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"hero-section flex flex-col items-center justify-center min-h-screen\" data-v-02281a80=\"\" data-v-5c084fcc=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".hero-section",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"about-me-section container mx-auto px-4 py-16\" data-v-02281a80=\"\" data-v-a1c590a8=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".about-me-section",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<h2 class=\"text-4xl font-bold text-center mb-8\" style=\"opacity:0;transform:translate3d(0px,100px,0px);\" data-v-faac0327=\"\">Skills</h2>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".skills-section > .text-4xl",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-lg font-semibold\" data-v-faac0327=\"\">Vue.js</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(1) > .sm\\:p-6.py-5.px-4 > .font-semibold.text-lg",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-sm text-gray-500 dark:text-gray-400\" data-v-faac0327=\"\">Advanced</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(1) > .sm\\:p-6.py-5.px-4 > .text-gray-500.dark\\:text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-lg font-semibold\" data-v-faac0327=\"\">Nuxt.js</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(2) > .sm\\:p-6.py-5.px-4 > .font-semibold.text-lg",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-sm text-gray-500 dark:text-gray-400\" data-v-faac0327=\"\">Advanced</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(2) > .sm\\:p-6.py-5.px-4 > .text-gray-500.dark\\:text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-lg font-semibold\" data-v-faac0327=\"\">Tailwind CSS</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(3) > .sm\\:p-6.py-5.px-4 > .font-semibold.text-lg",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-sm text-gray-500 dark:text-gray-400\" data-v-faac0327=\"\">Advanced</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(3) > .sm\\:p-6.py-5.px-4 > .text-gray-500.dark\\:text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-lg font-semibold\" data-v-faac0327=\"\">TypeScript</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(4) > .sm\\:p-6.py-5.px-4 > .font-semibold.text-lg",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-sm text-gray-500 dark:text-gray-400\" data-v-faac0327=\"\">Intermediate</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(4) > .sm\\:p-6.py-5.px-4 > .text-gray-500.dark\\:text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-lg font-semibold\" data-v-faac0327=\"\">Node.js</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(5) > .sm\\:p-6.py-5.px-4 > .font-semibold.text-lg",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-sm text-gray-500 dark:text-gray-400\" data-v-faac0327=\"\">Intermediate</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(5) > .sm\\:p-6.py-5.px-4 > .text-gray-500.dark\\:text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-lg font-semibold\" data-v-faac0327=\"\">Supabase</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(6) > .sm\\:p-6.py-5.px-4 > .font-semibold.text-lg",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<p class=\"text-sm text-gray-500 dark:text-gray-400\" data-v-faac0327=\"\">Intermediate</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".p-4.divide-y.divide-gray-200:nth-child(6) > .sm\\:p-6.py-5.px-4 > .text-gray-500.dark\\:text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"experience-section container mx-auto px-4 py-16\" data-v-02281a80=\"\" data-v-c9f83195=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".experience-section",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"projects-section container mx-auto px-4 py-16\" data-v-02281a80=\"\" data-v-6eb5b43c=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".projects-section",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<h2 class=\"text-4xl font-bold text-center mb-8\" style=\"opacity:0;transform:translate3d(0px,100px,0px);\" data-v-a5e1eb00=\"\">Contact Me</h2>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".contact-section > .text-4xl",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"mb-4\" data-v-a5e1eb00=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".mb-4[data-v-a5e1eb00=\"\"]:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"mb-4\" data-v-a5e1eb00=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".mb-4[data-v-a5e1eb00=\"\"]:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"mb-4\" data-v-a5e1eb00=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".mb-4[data-v-a5e1eb00=\"\"]:nth-child(3)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<div class=\"mb-4\" data-v-a5e1eb00=\"\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".mb-4[data-v-a5e1eb00=\"\"]:nth-child(4)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.keyboard",
+       "best-practice",
+       "RGAAv4",
+       "RGAA-9.2.1",
+     ],
+   },
+   Object {
+     "description": "Ensure select element has an accessible name",
+     "help": "Select element must have an accessible name",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/select-name?application=playwright",
+     "id": "select-name",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "implicit-label",
+             "impact": "critical",
+             "message": "Element does not have an implicit (wrapped) <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "explicit-label",
+             "impact": "critical",
+             "message": "Element does not have an explicit <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "critical",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "critical",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "critical",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "presentational-role",
+             "impact": "critical",
+             "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element does not have an implicit (wrapped) <label>
+   Element does not have an explicit <label>
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute
+   Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+         "html": "<select value=\"en\" class=\"relative block w-ful...\" data-v-1437ce7f=\"\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "select",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.forms",
+       "wcag2a",
+       "wcag412",
+       "section508",
+       "section508.22.n",
+       "TTv5",
+       "TT5.c",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-11.1.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e5]:
    - generic [ref=e8]:
      - link "MSA" [ref=e9]:
        - /url: /
      - combobox [ref=e12]:
        - option "English"
        - option "Indonesia" [selected]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - img "Avatar" [ref=e18]
          - heading "Muh Syahendra A" [level=1] [ref=e19]
          - heading "Software Engineer" [level=2] [ref=e20]
          - paragraph [ref=e21]: A passionate Software Engineer with expertise in web development.
        - generic [ref=e22]:
          - heading "About Me" [level=2] [ref=e23]
          - generic [ref=e24]:
            - img "Avatar" [ref=e26]
            - paragraph [ref=e27]: A passionate Software Engineer with expertise in web development.
        - generic [ref=e28]:
          - heading "Skills" [level=2] [ref=e29]
          - generic [ref=e30]:
            - generic [ref=e32]:
              - paragraph [ref=e33]: Vue.js
              - paragraph [ref=e34]: Advanced
            - generic [ref=e36]:
              - paragraph [ref=e38]: Nuxt.js
              - paragraph [ref=e39]: Advanced
            - generic [ref=e41]:
              - paragraph [ref=e43]: Tailwind CSS
              - paragraph [ref=e44]: Advanced
            - generic [ref=e46]:
              - paragraph [ref=e48]: TypeScript
              - paragraph [ref=e49]: Intermediate
            - generic [ref=e51]:
              - paragraph [ref=e53]: Node.js
              - paragraph [ref=e54]: Intermediate
            - generic [ref=e56]:
              - paragraph [ref=e58]: Supabase
              - paragraph [ref=e59]: Intermediate
        - generic [ref=e60]:
          - heading "Experience" [level=2] [ref=e61]
          - generic [ref=e64]:
            - heading "1" [level=1] [ref=e66]
            - generic [ref=e67]:
              - heading "Senior Web Developer" [level=3] [ref=e68]
              - paragraph [ref=e69]: Tech Solutions Inc. (Jan 2022 - Present)
              - paragraph [ref=e70]: Led development of scalable web applications using Vue.js and Nuxt.js. Mentored junior developers and optimized performance.
        - generic [ref=e71]:
          - heading "Projects" [level=2] [ref=e72]
          - generic [ref=e74]:
            - generic [ref=e75]:
              - img "E-commerce Platform" [ref=e76]
              - heading "E-commerce Platform" [level=3] [ref=e77]
            - generic [ref=e78]:
              - paragraph [ref=e79]: Developed a full-stack e-commerce platform with user authentication, product catalog, and payment gateway integration.
              - generic [ref=e80]:
                - generic [ref=e81]: Nuxt.js
                - generic [ref=e82]: Vue.js
                - generic [ref=e83]: Tailwind CSS
                - generic [ref=e84]: Node.js
                - generic [ref=e85]: PostgreSQL
            - link "View Project" [ref=e87]:
              - /url: https://example.com/ecommerce
              - text: View Project
        - generic [ref=e89]:
          - heading "Contact Me" [level=2] [ref=e90]
          - generic [ref=e94]:
            - textbox "Name" [ref=e97]
            - textbox "Email" [ref=e100]
            - textbox "Subject" [ref=e103]
            - textbox "Message" [ref=e106]
            - button "Send Message" [ref=e107] [cursor=pointer]
      - button "Download PDF" [ref=e109] [cursor=pointer]: Download PDF
      - contentinfo [ref=e111]:
        - generic [ref=e112]:
          - paragraph [ref=e114]: © 2026 Muh Syahendra A. All rights reserved.
          - generic [ref=e115]:
            - link [ref=e116]:
              - /url: https://www.linkedin.com/in/muhsyahendraa/
            - link [ref=e118]:
              - /url: https://github.com/hendras1722
            - link [ref=e120]:
              - /url: https://discordapp.com/users/squidy5488
            - link [ref=e122]:
              - /url: https://www.instagram.com/msyaa240/
  - generic:
    - img
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright'; // Import AxeBuilder
  3  | 
  4  | test.describe('Home Page', () => {
  5  |   test('should navigate to the home page and display the hero section', async ({ page }) => {
  6  |     await page.goto('/');
  7  | 
  8  |     // Wait for the hero section content to be visible, ensuring data is loaded
  9  |     await expect(page.getByRole('heading', { name: 'Software Engineer' })).toBeVisible();
  10 | 
  11 |     // Expect a title "to contain" the full dynamic title.
  12 |     await expect(page).toHaveTitle(/Home - Muh Syahendra A/);
  13 | 
  14 |     // Expect the hero section to be visible (locator for a class)
  15 |     await expect(page.locator('.hero-section')).toBeVisible();
  16 | 
  17 |     // Further check for specific text content
  18 |     await expect(page.getByText('A passionate Software Engineer with expertise in web development.').first()).toBeVisible();
  19 |   });
  20 | 
  21 |   test('should not have any accessibility violations on the home page', async ({ page }) => {
  22 |     await page.goto('/');
  23 | 
  24 |     // Wait for the content to be loaded to ensure accessibility checks are performed on a stable page
  25 |     await expect(page.getByRole('heading', { name: 'Software Engineer' })).toBeVisible();
  26 | 
  27 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  28 | 
> 29 |     expect(accessibilityScanResults.violations).toEqual([]);
     |                                                 ^ Error: expect(received).toEqual(expected) // deep equality
  30 |   });
  31 | });
  32 | 
```