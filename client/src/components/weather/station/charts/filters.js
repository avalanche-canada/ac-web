
export function shouldShowGraph(data, ...fields) {
    const hasFielsd = fields.map(f => { 
        return data.filter(d =>  d[f] !== undefined).length > 0
    })
    const yeses = hasFielsd.filter(x => x)
    return yeses.length > 0 
}

export function filterDataset(data, xProp, yProp) {
    return data.filter(d => d[xProp] !== undefined && d[yProp] !== undefined)
}
