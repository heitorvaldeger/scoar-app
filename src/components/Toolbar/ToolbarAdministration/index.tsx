import { ButtonDefault } from "@/components/Buttons/ButtonDefault";
import { useToolbarAdministration } from "@/hooks/useToolbarAdministration";
import { MoreVertOutlined } from "@mui/icons-material";
import { Toolbar, Typography, Divider, IconButton, Menu, MenuItem } from "@mui/material";

export const ToolbarAdministration = () => {
  const {
    title,
    anchorElNav,
    handleCloseNavMenu,
    handleOpenNavMenu,
    onOpenModalCreateDevice,
    onOpenModalProtocolList,
    onOpenModalPlaceList
  } = useToolbarAdministration();

  return (
    <Toolbar sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}>
      <Typography fontSize={18} fontWeight={400}>{title}</Typography>
      <Divider orientation='vertical' flexItem sx={{
        my: 1,
        mx: 1
      }}
      />
      <ButtonDefault
        text="Novo Dispositivo"
        variant="contained"
        style={{
          fontWeight: 500
        }}
        onClick={onOpenModalCreateDevice}
        className="mx-2 bg-zinc-600 uppercase"
      />

      <span className="mx-2"></span>

      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <MenuItem onClick={() => {
          onOpenModalProtocolList();
          handleCloseNavMenu();
        }}>
          <Typography textAlign="center">Protocolos</Typography>
        </MenuItem>

        <MenuItem onClick={() => {
          onOpenModalPlaceList();
          handleCloseNavMenu();
        }}>
          <Typography textAlign="center">Locais</Typography>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}