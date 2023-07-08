import './globals.css'

export default function RootLayout({ children }){ 
    return(
        <html>
            <head>
                <title>La Pilcha PF</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}