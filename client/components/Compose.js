import { cloneElement } from 'react'
import PropTypes from 'prop-types'

// Copied from https://github.com/jamesplease/react-composer/blob/master/src/index.js

Compose.propTypes = {
    children: PropTypes.func.isRequired,
    components: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default function Compose({ children, components }) {
    return renderRecursive(children, components)
}

function renderRecursive(render, remaining, results = []) {
    if (!remaining[0]) {
        return render(results)
    }

    function nextRender(value) {
        return renderRecursive(
            render,
            remaining.slice(1),
            results.concat([value])
        )
    }

    return cloneElement(remaining[0], { children: nextRender })
}
