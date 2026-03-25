import HomeScreen from "../src/screens/HomeScreen";

export default HomeScreen;

// import React from "react"
// import Link from "../src/components/Link"
// import Footer from "../src/components/patterns/Footer/index"

// function GlobalStyle() {
//     return (
//         <style global jsx>{`
//             body{
//                 font-family: sans-serif;
//             }    
//         `}</style>
//     )
// }

// function Title({ children, as }) {
//     const Tag = as;
//     return ( // ele reclama que precisa que tudo que está aqui dentro esteja em uma div, mas não queremos então usaremos <React.Fragment>
//         // dentro de style precisa colocar jsx e utilizar {``}
//         <React.Fragment>

//             <Tag>
//                 {children}
//             </Tag>
            
//             <style jsx>{`
//                 ${Tag} {
//                     color: red;
//                     font-family: sans-serif;
//                 }    
//             `}</style>
//         </React.Fragment>
//     )
// }

// export default function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title as="h1">Alura Cases - Home</Title>
//             <Link href="/faq">
//                Ir para o FAQ
//             </Link>
//             <Footer />
//         </div>
//     )
// }