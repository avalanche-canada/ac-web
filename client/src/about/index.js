import MemberList from './staff/MemberList'
import Section from './Section'

export function Staff({ document }) {
    const members = document.getGroup('staff-members.staff').toArray()

    return (
        <Section title='Staff'>
            <MemberList members={members} />
        </Section>
    )
}
