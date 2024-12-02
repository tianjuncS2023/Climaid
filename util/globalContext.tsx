type Store = { [key: string]: any };

class GlobalStorage {
	private store: Store;

	constructor() {
		this.store = {};
	}

	// Set a value in the global storage
	set<T>(key: string, value: T): void {
		this.store[key] = value;
	}

	// Get a value from the global storage
	get<T>(key: string): T | undefined {
		return this.store[key];
	}

	// Remove a value from the global storage
	remove(key: string): void {
		delete this.store[key];
	}

	// Check if a key exists in the global storage
	has(key: string): boolean {
		return key in this.store;
	}
}

// Create a singleton instance of the GlobalStorage class
const globalStorage = new GlobalStorage();

export default globalStorage;
