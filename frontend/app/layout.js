// import theme style scss file
import 'styles/theme.scss';

export const metadata = {
    title: 'Assessment System',
    description: 'Assessment System built using Next.js, Dash UI',
    keywords: 'Dash UI, Next.js 13, questionnaire, admin template, web apps, bootstrap 5, admin theme'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                {children}
            </body>
        </html>
    )
}
