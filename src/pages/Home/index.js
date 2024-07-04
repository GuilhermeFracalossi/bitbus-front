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
                                height: "90vh",
                                backgroundImage: "url('/images/inventory_banner.jpg')",
                                backgroundSize: "cover",
                            }}
                            className="rounded-md"
                        >
                            <BlackOutBackground>
                                <Title style={{ color: "#12b886" }} className="shadow hover:shadow-lg opacity-100">Inventário</Title>
                            </BlackOutBackground>
                        </div>
                    </Link >
                </Grid.Col>
                <Grid.Col span="auto">
                    <Link to="/visits">
                        <div
                            style={{
                                height: "90vh",
                                backgroundImage: "url('/images/visits_banner.jpg')",
                                backgroundSize: "cover",
                            }}
                            className="rounded-md"
                        >
                            <BlackOutBackground>
                                <Title style={{ color: "#12b886" }} className="shadow hover:shadow-lg opacity-100">Visitas</Title>
                            </BlackOutBackground>
                        </div>
                    </Link >

                </Grid.Col>
                <Grid.Col span="auto">
                    <Link to="/workshops">
                        <div
                            style={{
                                height: "90vh",
                                backgroundImage: "url('/images/workshop_banner.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            className="rounded-md"
                        >
                            <BlackOutBackground>
                                <Title style={{ color: "#12b886" }} className="shadow hover:shadow-lg opacity-100">Palestras e oficinas</Title>
                            </BlackOutBackground>
                        </div>
                    </Link >
                </Grid.Col>
            </Grid>
        </Container>
    );
}

const BlackOutBackground = ({ children }) => {
    return <div
        style={{
            backgroundColor: "#000000",
            height: "100%",
            width: "100%",
        }}
        className="flex justify-center items-center shadow hover:shadow-lg rounded-md opacity-70 hover:opacity-85"
    >
        {children}
    </div>;
}