import NextLink from "next/link" //esse é o mesmo import Link da outra tela, mas agora foi nomeado diferente para não haver conflito

export default function Link({ children, href, ...props}) {
    return (
        <NextLink href={href} {...props}>
            {children}
        </NextLink>
    );
}

