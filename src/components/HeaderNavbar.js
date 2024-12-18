import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";


export default function HeaderNavbar() {
  const items = [{ key: `/`, label: `Home` }, {key: `/Dashboard`, label: `Dashboard`}];
  const navigate = useNavigate();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
        onClick={({key})=>{
          navigate((key), { replace: true });
        }}
      />
    </Header>
  );
}
