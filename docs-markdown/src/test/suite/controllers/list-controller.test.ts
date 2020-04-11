import * as chai from "chai";
import * as spies from "chai-spies";
import { resolve } from "path";
import { commands, window } from "vscode";
import { automaticList, insertBulletedList, insertListsCommands, insertNestedList, insertNumberedList, removeNestedList } from "../../../controllers/list-controller";
import * as common from "../../../helper/common";
import * as list from "../../../helper/list";
//import * as telemetry from "../../../helper/telemetry";
import { loadDocumentAndGetItReady, sleep } from "../../test.common/common";

chai.use(spies);

// tslint:disable-next-line: no-var-requires
const sinon = require("sinon");

const expect = chai.expect;

suite("List Controller", () => {
    // Reset and tear down the spies
    teardown(() => {
        chai.spy.restore(common);
    });
    suiteTeardown(async () => {
        await commands.executeCommand("workbench.action.closeAllEditors");
    });

    test("insertListsCommands", () => {
        const controllerCommands = [
            { command: automaticList.name, callback: automaticList },
            { command: insertBulletedList.name, callback: insertBulletedList },
            { command: insertNestedList.name, callback: insertNestedList },
            { command: insertNumberedList.name, callback: insertNumberedList },
            { command: removeNestedList.name, callback: removeNestedList },
        ];
        expect(insertListsCommands()).to.deep.equal(controllerCommands);
    });
    test("noActiveEditorMessage", () => {
        const spy = chai.spy.on(common, "noActiveEditorMessage");
        insertNumberedList();
        expect(spy).to.have.been.called();
    });
    test("isMarkdownFileCheck", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        const spy = chai.spy.on(common, "isMarkdownFileCheck");
        insertNumberedList();
        await sleep(300);
        expect(spy).to.have.been.called();
    });
    test("checkEmptyLine", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);

        window.showQuickPick = (items: string[] | Thenable<string[]>) => {
            return Promise.resolve("Numbered list") as Thenable<any>;
        };
        // const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "checkEmptyLine");
        insertNumberedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        // stub.restore();
    });
    test("checkEmptySelection", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);

        window.showQuickPick = (items: string[] | Thenable<string[]>) => {
            return Promise.resolve("Numbered list") as Thenable<any>;
        };
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "checkEmptySelection");
        insertNumberedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("insertList", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);

        window.showQuickPick = (items: string[] | Thenable<string[]>) => {
            return Promise.resolve("Numbered list") as Thenable<any>;
        };
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "insertList");
        insertNumberedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("createNumberedListFromText", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);

        window.showQuickPick = (items: string[] | Thenable<string[]>) => {
            return Promise.resolve("Numbered list") as Thenable<any>;
        };
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "createNumberedListFromText");
        insertNumberedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("createBulletedListFromText", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);

        window.showQuickPick = (items: string[] | Thenable<string[]>) => {
            return Promise.resolve("Bulleted list") as Thenable<any>;
        };
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "createBulletedListFromText");
        insertBulletedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("autolistNumbered", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "autolistNumbered");
        automaticList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("autolistAlpha", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "autolistAlpha");
        automaticList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("insertContentToEditor", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(common, "insertContentToEditor");
        automaticList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("insertContentToEditor - nested list", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(common, "insertContentToEditor");
        insertNestedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("removeNestedListMultipleLine", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "removeNestedListMultipleLine");
        removeNestedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
    test("removeNestedListSingleLine", async () => {
        const filePath = resolve(__dirname, "../../../../../src/test/data/repo/articles/list.md");
        await loadDocumentAndGetItReady(filePath);
        //const stub = sinon.stub(telemetry, "sendTelemetryData");
        const spy = chai.spy.on(list, "removeNestedListSingleLine");
        removeNestedList();
        await sleep(500);
        expect(spy).to.have.been.called();
        //stub.restore();
    });
});
