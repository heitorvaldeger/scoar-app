import { DeviceList } from "@/components/Lists/DeviceList";
import { Container } from "@mui/material";

export const Dashboard = () => {
  return (
    <div>
      <div className="px-4">
        <Container maxWidth="lg">
          <DeviceList />
        </Container>
      </div>
    </div>
  )
}