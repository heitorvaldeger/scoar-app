import { Power, PowerOff, Info, Place, BrandingWatermark } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, IconButton, Slider, Tooltip, Typography } from "@mui/material";
import { DeviceCardProps } from "./types";
import { useDeviceActions } from "@/hooks/useDeviceActions";
import React from "react";

export const DeviceCard = React.memo((props: DeviceCardProps) => {
  const { device } = props;

  const {
    onUpdateStatus,
    onUpdateTemperature,
    sincTemp,
  } = useDeviceActions(device);

  return (
    <>
      <Card>
        <CardContent className="pb-0">
          <div className="flex justify-between items-center">
            <Typography variant="h6">{device.code}</Typography>
            <IconButton onClick={() => {onUpdateStatus(device.code)}}>
              {device.status ? <Power color="primary" /> : <PowerOff />}
            </IconButton>
          </div>

          {device.sinc_temp ?
            <div className="flex items-center">
              <Typography variant="caption" color={'gray'}>
                {sincTemp}
              </Typography>
              <Tooltip placement="right" title={'Última sincronização com o dispositivo'}>
                <Info className="ml-2" fontSize="small" sx={{
                  color: 'gray'
                }}></Info>
              </Tooltip>
            </div>
            : <div className="my-5"></div>
          }

          <div className="text-center">
            <Typography variant="h4" sx={{
              color: '#00000099'
            }}>{device.temperature} ºC</Typography>

            <Slider
              size="small"
              value={device.temperature}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={16}
              max={30}
              onChange={(_e, value) => {
                if (typeof value === 'number') onUpdateTemperature(device.code, value);
              }}
            />
          </div>

          {/* <Divider/> */}

          <div>
            <Typography className="text-center font-light">
              Informações gerais
            </Typography>
            <div className="flex justify-between my-2">
              <Box width='50%' className="text-center">
                <Place sx={{
                  color: '#00000099'
                }} />
                <Typography variant="body2" sx={{
                  color: '#00000099'
                }}>{device.place}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box width='50%' className="text-center">
                <BrandingWatermark sx={{
                  color: '#00000099'
                }} />
                <Typography variant="body2" sx={{
                  color: '#00000099'
                }}>{device.protocol}</Typography>
              </Box>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
});