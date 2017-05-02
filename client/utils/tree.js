export function findNode(root, id) {
    let node = null
    ;(function recurse(current) {
        for (let child of current.children || []) {
            if (child.id === id) {
                node = child
            } else if (node === null) {
                recurse(child)
            }
        }
    })(root)

    return node
}

export function getPath(root, node) {
    if (!node || root === node) {
        return [root]
    }

    const path = [node]
    let parent = getParent(root, node.id)

    while (parent !== root) {
        path.push(parent)

        parent = getParent(root, parent.id)
    }

    path.push(root)

    return path.reverse()
}

export function getParent(root, id) {
    let parent = root
    ;(function recurse(current) {
        for (let child of current.children || []) {
            if (child.id === id) {
                parent = current
            } else if (parent === root) {
                recurse(child)
            }
        }
    })(root)

    return parent
}
