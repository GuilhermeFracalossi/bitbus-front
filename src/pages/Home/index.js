import { Container, Grid, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <Container size="responsive">
            <Grid>
                <Grid.Col span="auto">
                    <Link to="/inventory">
                        <div
                            style={{
                                height: "600px",
                                backgroundImage: "url('/images/inventory_banner.jpg')",
                                backgroundSize: "cover",
                                zIndex: 1
                            }}
                            className="flex justify-center items-center shadow hover:shadow-lg rounded-md"
                        >
                            <Title style={{color: "#12b886"}} className="shadow hover:shadow-lg">Inventário</Title>
                        </div>
                    </Link >
                </Grid.Col>
                <Grid.Col span="auto">
                <Link to="/visits">
                        <div
                            style={{
                                height: "600px",
                                backgroundImage: "url('/images/visits_banner.jpg')",
                                backgroundSize: "cover",
                                zIndex: 1
                            }}
                            className="flex justify-center items-center shadow hover:shadow-lg rounded-md"
                        >
                            <Title style={{color: "#12b886"}} className="shadow hover:shadow-lg">Visitas</Title>
                        </div>
                    </Link >
                </Grid.Col>
            </Grid>
        </Container>
    );
}