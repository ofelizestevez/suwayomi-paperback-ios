import { Form, type FormSectionElement, Section, LabelRow } from "@paperback/types";

export class ProgressManagementForm extends Form {
  override getSections(): FormSectionElement<unknown>[] {
    return [
      Section(
        {
          id: 'progress',
          header: 'Suwayomi Reading Progress',
          footer:
            'Completed chapter reading actions are synchronized with your Suwayomi server.',
        },
        [
          LabelRow('syncStatus', {
            title: 'Progress Provider',
            value: 'Suwayomi',
          }),
        ],
      ),
    ]
  }
}