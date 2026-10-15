import { Form, NavigationRow, Section, type FormSectionElement } from '@paperback/types';

import { SearchSettingsForm } from './settings/search_settings_form';
import { ServerConnectionForm } from './settings/server_connection_form';

export class SettingsForm extends Form {
	override getSections(): FormSectionElement<unknown>[] {
		return [
			Section('serverConnection', [
				NavigationRow('serverConnection', {
					title: 'Server Settings',
					form: new ServerConnectionForm(),
				}),
				NavigationRow('searchDiscover', {
					title: 'Search & Discover',
					form: new SearchSettingsForm(),
				}),
			]),
		];
	}
}
