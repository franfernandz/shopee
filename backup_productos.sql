--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: productos; Type: TABLE; Schema: public; Owner: shopee_admin
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    marca character varying(100),
    genero character varying(50),
    familia_olfativa character varying(100),
    notas_salida text[],
    notas_corazon text[],
    notas_fondo text[],
    precio numeric(10,2),
    duracion character varying(50),
    proyeccion character varying(50),
    estacionalidad text[],
    ocasion text[],
    popularidad numeric(2,1)
);


ALTER TABLE public.productos OWNER TO shopee_admin;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: shopee_admin
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO shopee_admin;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shopee_admin
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: shopee_admin
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: shopee_admin
--

COPY public.productos (id, nombre, marca, genero, familia_olfativa, notas_salida, notas_corazon, notas_fondo, precio, duracion, proyeccion, estacionalidad, ocasion, popularidad) FROM stdin;
1	Dior Sauvage	Dior	masculino	aromática fougère	{bergamota,pimienta}	{lavanda,pachuli}	{cedro,ambroxan}	120.00	8+ horas	alta	{primavera,verano,otoño}	{día,noche}	4.8
2	La Vie Est Belle	Lancôme	femenino	floral dulce	{iris,praliné}	{jazmín,azahar}	{vainilla,patchouli}	110.00	6-8 horas	media	{otoño,invierno}	{fiestas,"noches especiales"}	4.7
3	Light Blue	Dolce & Gabbana	unisex	cítrico floral	{limón,"manzana verde"}	{jazmín,"rosa blanca"}	{cedro,almizcle}	90.00	4-6 horas	media	{verano}	{día}	4.5
4	Black Opium	Yves Saint Laurent	femenino	oriental vainilla	{café,"pimienta rosa"}	{jazmín,azahar}	{vainilla,cedro}	105.00	6-8 horas	alta	{otoño,invierno}	{noche}	4.6
5	Bleu de Chanel	Chanel	masculino	amaderada aromática	{limón,menta}	{jazmín,geranio}	{sándalo,incienso}	130.00	8+ horas	alta	{todas}	{día,noche}	4.9
6	Chanel No. 5	Chanel	femenino	floral aldehídica	{aldehídos,neroli}	{jazmín,rosa}	{sándalo,vetiver}	140.00	8+ horas	media	{todas}	{fiestas,"noches especiales"}	4.7
7	Acqua di Gio	Giorgio Armani	masculino	cítrico aromático	{bergamota,neroli}	{jazmín,romero}	{cedro,almizcle}	115.00	6-8 horas	media	{primavera,verano}	{día}	4.6
8	Flowerbomb	Viktor & Rolf	femenino	floral oriental	{bergamota,"té verde"}	{jazmín,rosa}	{vainilla,"madera de cachemira"}	125.00	6-8 horas	alta	{primavera,otoño}	{día,noche}	4.8
9	Gucci Bloom	Gucci	femenino	floral blanco	{jazmín,nardo}	{madreselva,rosa}	{almizcle,incienso}	110.00	6-8 horas	media	{primavera,verano}	{día}	4.5
10	Tom Ford Black Orchid	Tom Ford	unisex	oriental floral	{trufa,jazmín}	{orchid,"frutas negras"}	{incienso,vainilla}	150.00	8+ horas	alta	{otoño,invierno}	{noche,fiestas}	4.9
\.


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopee_admin
--

SELECT pg_catalog.setval('public.productos_id_seq', 1, false);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: shopee_admin
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

