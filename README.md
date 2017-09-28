<pre>
  _______                   _          _     
 |__   __|                 | |        (_)    
    | |_ __ ___  __ _ _ __ | |_ ______ _ ___ 
    | | '__/ _ \/ _` | '_ \| __|______| / __|
    | | | |  __/ (_| | | | | |_       | \__ \
    |_|_|  \___|\__,_|_| |_|\__|      | |___/
                                     _/ |    
                                    |__/     
</pre>

Treant-js is an SVG based JS library for drawing tree diagrams.
It relies on Raphael for handling SVG and animations.

For Docs, Examples, and everything else see:
http://fperucic.github.io/treant-js


1. add `node-levelNumber` class on html element created by node. for example the son node html looks like this: `<div class="node node-1">...</div>`
2. add `onBeforeCreateNode(nodeStructure)` callback which executed before node creation, can modify nodeStructure in it
3. add `buildNodeFromText(nodeStructure, container)` callback witch executed on create html node from text property, so now can generator different html content by js , and needn't add `innerHTML` property to the nodeStruction.
4. add 'text' config item for change the default `text` property name and support string value, for example the old config as follows:  
     `{chart:{}, nodeStructure:{text:{val:'aspark'}, children:[]}}`  

     now support config like this:  
    `{chart:{text:fullName}, nodeStructure:{fullName:'aspark', children:[]}}`
  
