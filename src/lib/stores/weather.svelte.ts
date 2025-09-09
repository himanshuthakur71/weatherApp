

// Define type for individual weather attributes
export interface WeatherAttribute {
    key: string;
    value: any;
}

// Class-based weather store
class Weather {
    attributes: WeatherAttribute[] = $state([]);

    // Add a new attribute
    add(attr: WeatherAttribute) {
        this.attributes = [...this.attributes, attr];
    }

    // Delete attribute by key
    deleteByKey(key: string) {
        this.attributes = this.attributes.filter(item => item.key !== key);
    }

    // Update an attribute value by key
    update(key: string, value: any) {
        this.attributes = this.attributes.map(item =>
            item.key === key ? { ...item, value } : item
        );
    }

    // Force store to refresh (useful if nested fields changed)
    touch() {
        this.attributes = [...this.attributes];
    }

    // Get a value by key
    get(key: string) {
        const item = this.attributes.find(i => i.key === key);
        return item ? item.value : null;
    }
}

// Singleton instance
export const weatherStore = new Weather();
