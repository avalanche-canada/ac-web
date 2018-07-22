export function findNode(root, id) {
    let node = null
    function recurse(current) {
        if (Array.isArray(current.children)) {
            for (var index = 0; index < current.children.length; index++) {
                const child = current.children[index]

                if (child.id === id) {
                    node = child
                } else if (node === null) {
                    recurse(child)
                }
            }
        }
    }

    recurse(root)

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
    function recurse(current) {
        if (Array.isArray(current.children)) {
            for (let index = 0; index < current.children.length; index++) {
                const child = current.children[index]

                if (child.id === id) {
                    parent = current
                } else if (parent === root) {
                    recurse(child)
                }
            }
        }
    }

    recurse(root)

    return parent
}
