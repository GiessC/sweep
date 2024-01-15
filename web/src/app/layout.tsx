interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return <html lang='en'>{children}</html>;
};

export default Layout;
