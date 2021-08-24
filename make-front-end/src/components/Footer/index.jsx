import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={"最终解释权归一个魂所有"}
      links={[
        {
          key: 'Ant Design Pro',
          title: '关于asoul',
          href: 'https://space.bilibili.com/703007996',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/peterpei1186861238/A-Soul-Database',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '关于我们',
          href: '/web/index.html#/./about',
          blankTarget: true,
        },
      ]}
    />
  );
};
