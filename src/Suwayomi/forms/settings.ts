import { Form, NavigationRow, Section, type FormSectionElement } from '@paperback/types';

import { SearchDiscoverForm } from './search_discover';
import { serverConnectionForm } from './server_connection';

export class SettingsForm extends Form {
	override getSections(): FormSectionElement<unknown>[] {
		return [
			Section('serverConnection', [
				NavigationRow('serverConnection', {
					title: 'Server Settings',
					form: new serverConnectionForm(),
				}),
				NavigationRow('searchDiscover', {
					title: 'Search & Discover',
					form: new SearchDiscoverForm(),
				}),
			]),
		];
	}
}
