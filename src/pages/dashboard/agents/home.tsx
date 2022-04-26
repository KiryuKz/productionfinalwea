// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../../_mock';
// components
import Page from '../../../components/Page';
// sections
import {
    AgentGoTo
} from '../../../sections/@dashboard/agent/general'
import { AppWelcome } from '../../../sections/@dashboard/general/app';
// assets
import { MotivationIllustration } from '../../../assets';
import Kanban from '../kanban';
import Calendar from '../calendar';
// ----------------------------------------------------------------------

AgentHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant='agent'>{page}</Layout>;
};

//
export default function AgentHome() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: E-commerce">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Congratulations! \n ${user?.displayName}`}
              description="Best seller of the month You have done 57.6% more sales today."
              img={
                <MotivationIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Go Now</Button>}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={4}>
            <EcommerceNewProducts list={_ecommerceNewProducts} />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <AgentGoTo
              title="My clients"
              icon='ic:baseline-manage-accounts'
              button="Gestionar clientes"
              total={3}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AgentGoTo
              title="Solicitudes pendientes"
              icon='ic:outline-manage-history'
              button="Gestionar solicitudes"
              total={10}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <AgentGoTo
              title="Mensajes pendientes"
              icon='ant-design:message-filled'
              button="Gestionar mensajes"
              total={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AgentGoTo
              title="Agenda"
              icon='ant-design:calendar-filled'
              button="Ver Agenda"
              total={0}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AgentGoTo
              title="Mensajes pendientes"
              icon='ant-design:message-filled'
              button="Gestionar mensajes"
              total={3}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
