import { Button, Container, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container size="responsive">
            <Grid>
                <Grid.Col span="auto">
                    <Button
                        variant="outline"
                        color="teal"
                        fullWidth
                        style={{
                            height: "300px"
                        }}
                        onClick={() => navigate("/inventory")}
                    >
                        Inventário
                    </Button>
                </Grid.Col>
                <Grid.Col span="auto">
                    <Button
                        variant="outline"
                        color="teal"
                        fullWidth
                        style={{
                            height: "300px"
                        }}
                        onClick={() => navigate("/visits")}
                    >
                        Visitas
                    </Button>
                </Grid.Col>
            </Grid>
        </Container>
    );
}