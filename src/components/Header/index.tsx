import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { Image } from 'office-ui-fabric-react/lib/Image';

import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import {
  IContextualMenuItemProps,
  ContextualMenuItem,
  IContextualMenuItemStyles,
  IContextualMenuStyles,
  ContextualMenuItemType,
  IContextualMenuProps,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { getTheme, concatStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


initializeIcons(/* optional base url */);
const theme = getTheme();
// Styles for both command bar and overflow/menu items
const itemStyles: Partial<IContextualMenuItemStyles> = {
  label: { fontSize: 18 },
  icon: { color: theme.palette.orange },
  iconHovered: { color: theme.palette.orangeLight },
};
// For passing the styles through to the context menus
const menuStyles: Partial<IContextualMenuStyles> = {
  subComponentStyles: { menuItem: itemStyles, callout: {} },
};

const DIRECTION_OPTIONS= [{ key: DirectionalHint.bottomCenter, text: 'Bottom Center' }]

const UserMenu = ( { persona }: any ) => {
  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      isBeakVisible: true,
      directionalHint: DirectionalHint.bottomCenter,
      directionalHintForRTL: DirectionalHint.bottomCenter,
      gapSpace: 0,
      beakWidth: 20,
      directionalHintFixed: false,
      items: menuItems,
    }),
    [],
  );
  console.log(theme.palette)

  return (
    <div className="ms-ContextualMenuDirectionalExample">
      <div className="ms-ContextualMenuDirectionalExample-buttonArea">
        <DefaultButton 
          style={{height: '52px', border: 'none'}}
          menuProps={menuProps}>
          <Persona 
            {...persona}
            size={PersonaSize.size40}
            hidePersonaDetails={false}
            imageAlt="user profile"
          />
        </DefaultButton>
      </div>
    </div>
  );
};


const menuItems: IContextualMenuItem[] = [
  {
    key: 'settings',
    text: 'Configuración',
    href: ROUTES.ACCOUNT,
  },
  {
    key: 'admin',
    text: 'Administración',
    href: ROUTES.ADMIN,
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'logout',
    text: 'Cerrar sesión',
    onRender: () => { return <SignOutButton /> },
    dataIsFocusable: true
  },
];




const getCommandBarButtonStyles = memoizeFunction(
  (originalStyles: IButtonStyles | undefined): Partial<IContextualMenuItemStyles> => {
    if (!originalStyles) {
      return itemStyles;
    }

    return concatStyleSets(originalStyles, itemStyles);
  },
);

// Custom renderer for main command bar items
const CustomButton: React.FunctionComponent<IButtonProps> = props => {
  // const buttonOnMouseClick = () => alert(`${props.text} clicked`);
  const buttonOnMouseClick = () => {};
  // eslint-disable-next-line react/jsx-no-bind
  return <CommandBarButton {...props} onClick={buttonOnMouseClick} styles={getCommandBarButtonStyles(props.styles)} />;
};

// Custom renderer for menu items (these must have a separate custom renderer because it's unlikely
// that the same component could be rendered properly as both a command bar item and menu item).
// It's also okay to custom render only the command bar items without changing the menu items.
const CustomMenuItem: React.FunctionComponent<IContextualMenuItemProps> = props => {
  const buttonOnMouseClick = () => alert(`${props.item.text} clicked`);
  // Due to ContextualMenu implementation quirks, passing styles here doesn't work
  // eslint-disable-next-line react/jsx-no-bind
  return <ContextualMenuItem {...props} onClick={buttonOnMouseClick} />;
};

const overflowProps: IButtonProps = {
  ariaLabel: 'More commands',
  menuProps: {
    contextualMenuItemAs: CustomMenuItem,
    // Styles are passed through to menu items here
    styles: menuStyles,
    items: [], // CommandBar will determine items rendered in overflow
    isBeakVisible: true,
    beakWidth: 20,
    gapSpace: 10,
    directionalHint: DirectionalHint.topCenter,
  },
};

export const CommandBarButtonAsExample = ({ authUser }: any) => {
  const personaBase: IPersonaSharedProps = {};

  if (authUser) {
    if (authUser.providerData && authUser.providerData.length) {
     const user = authUser.providerData[0];
     personaBase.text = user.displayName;
     personaBase.imageUrl = user.photoURL
     personaBase.secondaryText = user.email
    } else {
      personaBase.text = authUser.username;
      personaBase.secondaryText = authUser.email
    }
  }

  return (
    <div style={{
      borderTop: `2px solid ${ theme.palette.orange}`,
      padding:'.5em 1em',
      display: 'flex',
      justifyContent:'flex-start',
      boxShadow: '0px 0px 30px rgba(0,0,0,.3)',
      position: 'sticky',
      zIndex: 999,
      backgroundColor: '#fff'
    }}>
      <Link to={ROUTES.HOME}>
        <Image
          src="assets/origens_logo.png"
          alt="Origens logo"
          width={150}
        />
      </Link>

      <div style={{display: 'block', width: '100%'}}>
        <CommandBar
          overflowButtonProps={overflowProps}
          // Custom render all buttons
          buttonAs={CustomButton}
          items={authUser ? _itemsAuth : []}
          overflowItems={authUser ? _overflowItems : []}
          farItems={authUser ? []: _farItemsNonAuth}
          ariaLabel="Utiliza las flechas izquierda y derecha para navegar entre comandos."
        />
      </div>

      { authUser
        ?  
        <div>
             <UserMenu persona={personaBase}/>
          </div>
        : <></>
      }
      </div>
  );
};

const _items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      // Must specify the menu item type for submenus too!
      contextualMenuItemAs: CustomMenuItem,
      // Styles are passed through to menu items here
      styles: menuStyles,
      items: [
        { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
      ],
    },
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: { iconName: 'Upload' },
    href: 'https://developer.microsoft.com/en-us/fluentui',
  },
  { key: 'share', text: 'Share', iconProps: { iconName: 'Share' }, onClick: () => console.log('Share') },
  { key: 'download', text: 'Download', iconProps: { iconName: 'Download' }, onClick: () => console.log('Download') },
];

const _itemsAuth: ICommandBarItemProps[] = [
  {
    key: 'home',
    text: 'Inicio',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      // Must specify the menu item type for submenus too!
      contextualMenuItemAs: CustomMenuItem,
      // Styles are passed through to menu items here
      styles: menuStyles,
      items: [
        { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
      ],
    },
  }
];

const _itemsNonAuth: ICommandBarItemProps[] = [
  {
    key: 'home',
    text: 'Inicio',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      // Must specify the menu item type for submenus too!
      contextualMenuItemAs: CustomMenuItem,
      // Styles are passed through to menu items here
      styles: menuStyles,
      items: [
        { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
      ],
    },
  },
];

const _overflowItems: ICommandBarItemProps[] = [
  { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
  { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
  { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: 'tile',
    text: 'Grid view',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Grid view',
    iconOnly: true,
    iconProps: { iconName: 'Tiles' },
    onClick: () => console.log('Tiles'),
  },
  {
    key: 'info',
    text: 'Info',
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    onClick: () => console.log('Info'),
  },
];

const _farItemsNonAuth: ICommandBarItemProps[] = [
  {
    key: 'login',
    text: 'Iniciar sesión',
    ariaLabel: 'Info',
    iconOnly: false,
    iconProps: { iconName: 'FollowUser'},
    onClick: () => {},
    href: ROUTES.SIGN_IN,

  },
];

const Navigation = ({ authUser }: any) => {
  console.log('auth', authUser)
  return (
    authUser ? (
      <CommandBarButtonAsExample authUser={authUser} />
    ) : (
      <CommandBarButtonAsExample />
    )
  )
}

const NavigationAuth = ({ authUser }: any) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>
        <Image src="assets/logo.png" alt="Origens logo"/>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
  </ul>
);

const NavigationNonAuth = () => (
  <div style={{position: 'absolute', width: '100vw'}}>
    <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between'}}>
      <li style={{display: 'flex', justifySelf: 'flex-start'}}>
        <Link to={ROUTES.LANDING}>
          <Image src="assets/logo.png" alt="Origens logo"/>
        </Link>
      </li>
      <li style={{display: 'flex', justifySelf: 'flex-end', margin: 'auto 1em'}}>
        <Link to={ROUTES.SIGN_IN}>Iniciar sesión</Link>
      </li>
    </ul>

  </div>
);

const mapStateToProps = (state: any) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
