import React from 'react';

//import PersonaItem from './PersonaItem';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { ActivityItem, IActivityItemProps, Link, mergeStyleSets } from 'office-ui-fabric-react';
// import { TestImages } from '@uifabric/example-data';

const navStyles: Partial<INavStyles> = {
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: 'none',
    overflowY: 'auto',
  },
};
const PersonaItem = (data: any) => {
  console.log('data:', data)
  return (
    <li>
      <span>{data.message.text}</span>
    </li>
  )
}
const activi = []

const PersonasList = (data: any) => {
  const personas: INavLinkGroup[] = [{links: []}]
  data.messages.map((message: any, index: number) => {
    const key = `key${index}`;
    const name = `${message.text}, (sosa: ${index})`;
    personas[0].links.push(
      {
        name,
        icon: 'FollowUser',
        url: 'http://example.com',
        key,
        target: '_blank',
        componentRef: () => { return (<div><span>111111</span><br /><span>222222</span></div>)}
      },
    )

  }
  );



  const activityItemExamples: (IActivityItemProps & { key: string | number })[] = [
    {
      key: 1,
      activityDescription: [
        <Link
          key={1}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Jack Howden
        </Link>,
        <span key={2}> renamed </span>,
        <span key={3} >
          DocumentTitle.docx
        </span>,
      ],
      activityPersonas: [{ imageUrl: 'TestImages.personaMale' }],
      comments: 'Hello, this is the text of my basic comment!',
      timeStamp: '23m ago',
    },
    {
      key: 2,
      activityDescription: [
        <Link
          key={1}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Jack Howden
        </Link>,
        <span key={2}> renamed </span>,
        <span key={3} >
          DocumentTitle.docx
        </span>,
      ],
      activityPersonas: [{ imageUrl: 'TestImages.personaMale' }],
      comments: 'Hello, this is the text of my basic comment!',
      timeStamp: '23m ago',
    },
  ]

        /*
      <div>
        {
          activityItemExamples.map((ac) => (
              <ActivityItem {...ac} key={ac.key}/>
          )
        }
      </div>
      */

  return (
    <div>
      <Nav
        onLinkClick={_onLinkClick}
        selectedKey="key1"
        ariaLabel="Nav basic example"
        styles={navStyles}
        groups={personas}
      />

    </div>

  )
}
    
function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}

/*
const PersonasList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(message => (
      <PersonaItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);
*/

export default PersonasList;
