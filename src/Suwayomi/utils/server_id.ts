export function parseServerId(rawId: string, entity: string): number {
	const value = rawId.trim();
	const id = Number(value);

	if (!/^\d+$/.test(value) || id > 2_147_483_647) {
		throw new Error(`Invalid ${entity} ID: ${rawId}`);
	}

	return id;
}
