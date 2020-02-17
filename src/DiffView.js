import React from "react";
import {parseDiff, Diff, Hunk} from 'react-diff-view';
import 'react-diff-view/style/index.css';
const example = `diff --git a/.gitignore b/.gitignore
index e69de29..d8f3372 100644
--- a/.gitignore
+++ b/.gitignore
@@ -0,0 +1,3 @@
+node_modules
+.DS_Store
+.env
diff --git a/projectors/habitProjector.js b/projectors/habitProjector.js
index f068aaa..6ad9718 100644
--- a/projectors/habitProjector.js
+++ b/projectors/habitProjector.js
@@ -1,9 +1,2 @@
-// Two flows
-    // Augment existing projection
-    // Build Projection from scratch
-
-
-// Update projection
-// CreateProjection from scratch
-// Creating the model will be from OUTSIDE this part
+const moment = require("moment");
 // TODO: Check in about timestamps
@@ -14,4 +7,5 @@
  */
+
 const midnightsSinceLastCheckin = (newCheckin, prevCheckin) => {
-    //
+    return moment(newCheckin).diff(moment(prevCheckin).startOf("day"), "days")
 }
`


const DiffView = ({diffText}) => {
    const files = parseDiff(example);

    const renderFile = ({oldRevision, newRevision, type, hunks}) => (
        <Diff key={oldRevision + '-' + newRevision} viewType="split" diffType={type} hunks={hunks}>
            {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
        </Diff>
    );

    return (
        <div>
            {files.map(renderFile)}
        </div>
    );
};

export default DiffView