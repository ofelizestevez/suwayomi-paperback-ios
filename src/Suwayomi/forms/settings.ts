import { Form, NavigationRow, Section, type FormSectionElement } from "@paperback/types";
import { serverConnectionForm } from "./server_connection";

 export class SettingsForm extends Form {
    override getSections(): FormSectionElement<unknown>[] {
        return [
            Section("serverConnection",
                [
                    NavigationRow("serverConnection", {
                        title: 'Server Settings',
                        form: new serverConnectionForm(),
                    })
                ]
            ) 
        ]
    }
 }