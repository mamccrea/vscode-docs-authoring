import * as chai from "chai";
import * as spies from "chai-spies";
import { commands } from "vscode";
import { deleteEmptyMetadata, deleteNaMetadata, deleteCommentedMetadata } from "../../../../controllers/cleanup/removeEmptyMetadata";
import * as common from "../../../../helper/common";

chai.use(spies);

const expect = chai.expect;
const testString = `---
title: "Remove empty metadata markdown testing document" 
ms.naValue: na
ms.nsaValue: n/a
#ms.commented: "comment"
ms.list:
    - "some value"
    - "another value"
ms.listWEmpty:
    - ""
    - "real value"
    -
ms.empty:
ms.singleQuote: ''
ms.doubleQuote: ""
ms.realValue: "Hello World"
---
`

suite("Remove Empty Metadata", () => {
    // Reset and tear down the spies
    teardown(() => {
        chai.spy.restore(common);
    });
    suiteTeardown(async () => {
        await commands.executeCommand('workbench.action.closeAllEditors');
    });

    test("Delete Empty Metadata", async () => {
        const cleanedString = deleteEmptyMetadata(testString);
        const expectedString = `---
title: "Remove empty metadata markdown testing document" 
ms.naValue: na
ms.nsaValue: n/a
#ms.commented: "comment"
ms.list:
    - "some value"
    - "another value"
ms.listWEmpty:
    - "real value"
ms.realValue: "Hello World"
---
`
        expect(cleanedString).to.equal(expectedString);
    });

    test("Delete N/A Metadata", async () => {
        const cleanedString = deleteNaMetadata(testString);
        const expectedString = `---
title: "Remove empty metadata markdown testing document" 
#ms.commented: "comment"
ms.list:
    - "some value"
    - "another value"
ms.listWEmpty:
    - ""
    - "real value"
    -
ms.empty:
ms.singleQuote: ''
ms.doubleQuote: ""
ms.realValue: "Hello World"
---
`
        expect(cleanedString).to.equal(expectedString);
    });

    test("Delete Commented Metadata", async () => {
        const cleanedString = deleteCommentedMetadata(testString);
        const expectedString = `---
title: "Remove empty metadata markdown testing document" 
ms.naValue: na
ms.nsaValue: n/a
ms.list:
    - "some value"
    - "another value"
ms.listWEmpty:
    - ""
    - "real value"
    -
ms.empty:
ms.singleQuote: ''
ms.doubleQuote: ""
ms.realValue: "Hello World"
---
`
        expect(cleanedString).to.equal(expectedString);
    });

});