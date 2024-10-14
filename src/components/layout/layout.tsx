import { FC, ReactNode } from 'react';
import Assistant from '../assistant/assistant';
import styles from './layout.module.css';
import { ConfigProvider } from 'antd';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#42434B",
                    fontFamily: "Manrope",
                    fontSize: 16,
                    lineHeight: 1.5,
                },
                components: {
                    Tabs: {
                        inkBarColor: "#E10D34",
                        itemHoverColor: "#42434B",
                        itemSelectedColor: "#42434B",
                        itemColor: "#86878C",
                        cardHeight: "42px"
                    }
                }
            }}
        >
            <div className={styles.layout}>
                {children}
                <Assistant />
            </div>
        </ConfigProvider>
    )
}

export default Layout;