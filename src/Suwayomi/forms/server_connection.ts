import { ButtonRow, Form, InputRow, LabelRow, Section, type FormSectionElement } from "@paperback/types";
import { executeGraphQL } from "../api/client";
import { ServerVersionDocument } from "../api/generated/graphql";
import { config } from "../config";

export class serverConnectionForm extends Form {
    private serverUrl : string = config.serverUrl
    private connectionStatus?: {
        text: string,
        style: 'success' | 'error'
    }

    override getSections(): FormSectionElement<unknown>[] {
        return [this.urlSection(), this.testConnectionSection()];
    }
    
    urlSection() {
        return Section(
            {id: "url"},
            [
                InputRow('url', {
                    title: "URL",
                    value: this.serverUrl,
                    onValueChange: Application.Selector(this as serverConnectionForm, 'updateServerUrl')
                })
            ]
        )
    }

    testConnectionSection (){
        return Section(
            {id: "testConnection"},
            [
                ButtonRow('textConnection',
                    {
                        title: "Test Connection",
                        onSelect: Application.Selector(this as serverConnectionForm, 'testConnection')
                    }
                ),
                LabelRow('connectionStatus',
                    {
                        title: "Status",
                        value: this.connectionStatus
                    }
                )
            ]
        )
    }

    async updateServerUrl(value: string): Promise<void> {
        this.serverUrl = value
        this.connectionStatus = undefined

        config.serverUrl = value
        this.testConnection();
    }


  async testConnection(): Promise<void> {
    const url = this.serverUrl.trim()

    if (!/^https?:\/\/[^/\s]+/i.test(url)) {
      this.connectionStatus = {
        text: 'Enter a valid server URL.',
        style: 'error',
      }
      this.reloadForm()
      return
    }

    try {
      const result = await executeGraphQL(
        url,
        ServerVersionDocument,
      )

      if (typeof result.aboutServer?.version !== 'string') {
        throw new Error('Invalid server version response.')
      }

      this.connectionStatus = {
        text: `Connected — Suwayomi ${result.aboutServer.version}`,
        style: 'success',
      }

      console.log(
        `[Suwayomi] Connected to server version ${result.aboutServer.version}`,
      )
    } catch (error) {
      this.connectionStatus = {
        text:
          error instanceof Error
            ? error.message
            : 'Connection failed.',
        style: 'error',
      }

      console.error('[Suwayomi] Connection test failed:', error)
    }

    this.reloadForm()
  }
    
}