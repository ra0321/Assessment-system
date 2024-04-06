import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Users',
		icon: 'user',
		link: '/pages/user',
		isAdmin : true,
	},	
	{
		id: uuid(),
		title: 'Assessments',
		icon: 'folder',
		link: '/pages/assessment',
		isAdmin : true,
	},
	{
		id: uuid(),
		title: 'Sections',
		icon: 'file-text',
		link: '/pages/section',
		isAdmin : true,
	},
	{
		id: uuid(),
		title: 'Questions',
		icon: 'check',
		link: '/pages/question',
		isAdmin : true,
	},
	{
		id: uuid(),
		title: 'Scores',
		icon: 'trending-up',
		link: '/pages/score',
		isAdmin : false,
	},
	{
		id: uuid(),
		title: 'Submit score',
		icon: 'edit-2',
		link: '/pages/submit',
		isAdmin : false,
	},
	{
		id: uuid(),
		title: 'Authentication',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Sign In' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Sign Up' },
			{ id: uuid(), link: '/authentication/forget-password', name: 'Forget Password'}			
		]
	}
];

export default DashboardMenu;
