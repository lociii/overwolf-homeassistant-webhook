export function isGameData(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function decodeGameData(data: Record<string, unknown>): void {
    for (const fieldName of Object.keys(data)) {
        data[fieldName] = decodeValue(data[fieldName])
    }
}

function decodeValue(value: unknown): unknown {
    if (typeof value === "string") {
        try {
            value = JSON.parse(value) as unknown
        } catch (_) {}
    }
    if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
            value[index] = decodeValue(value[index])
        }
    } else if (isGameData(value)) {
        decodeGameData(value)
    }
    return value
}
