import React from 'react'
import {storiesOf, action} from '@storybook/react'
import {withKnobs, number, boolean, text} from '@storybook/addon-knobs'
import withRouter from '../../../.storybook/withRouter';
import Tree,{Node} from './'

const stories = storiesOf('Tree', module)

stories.addDecorator(withKnobs)
stories.addDecorator(withRouter)

stories.add('Tree', () => (
    <Tree>
        <Node label='Formation des avalanche'>
            <Node label='Manteau neigeux'></Node>
            <Node label="Problèmes d'avalanche">
                <Node label='Avalanche de neige sèche sans cohésion'></Node>
                <Node label='Avalanche de neige mouillée sans cohésion'></Node>
                <Node label='Avalanche de plaque de neige mouillée'></Node>
                <Node label='Avalanche de plaque de neige de tempête'></Node>
            </Node>
            <Node label='Signes de neige instable'></Node>
        </Node>
        <Node label='Terrain avalancheux'>
            <Node label='Inclinaison de la pente'></Node>
            <Node label='Exposition au vent'></Node>
        </Node>
        <Node label='Planification de l’excursion'></Node>
    </Tree>
))
