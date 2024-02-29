import { useDevice } from "@/hooks/useDevice";
import { Grid } from "@mui/material";
import { DeviceCard } from "../Cards/DeviceCard";

export const DeviceList = () => {
  const {
    devices
  } = useDevice();

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        devices.map((device) => (
          <Grid key={device.code} item xs={4} sm={4} md={4}>
            <DeviceCard device={device} />
          </Grid>
        ))
      }
    </Grid>
  )
}