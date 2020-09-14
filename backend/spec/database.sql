--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: meal; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.meal (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    "mealTypeId" integer NOT NULL
);


ALTER TABLE public.meal OWNER TO vlatko;

--
-- Name: meal_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.meal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meal_id_seq OWNER TO vlatko;

--
-- Name: meal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.meal_id_seq OWNED BY public.meal.id;


--
-- Name: meal_product; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.meal_product (
    id integer NOT NULL,
    amount integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "mealId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public.meal_product OWNER TO vlatko;

--
-- Name: meal_product_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.meal_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meal_product_id_seq OWNER TO vlatko;

--
-- Name: meal_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.meal_product_id_seq OWNED BY public.meal_product.id;


--
-- Name: meal_type; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.meal_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.meal_type OWNER TO vlatko;

--
-- Name: meal_type_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.meal_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meal_type_id_seq OWNER TO vlatko;

--
-- Name: meal_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.meal_type_id_seq OWNED BY public.meal_type.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    measure character varying NOT NULL,
    calories integer NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public.product OWNER TO vlatko;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO vlatko;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.session (
    "expiredAt" bigint NOT NULL,
    id character varying(255) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.session OWNER TO vlatko;

--
-- Name: user; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO vlatko;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO vlatko;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: meal id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal ALTER COLUMN id SET DEFAULT nextval('public.meal_id_seq'::regclass);


--
-- Name: meal_product id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal_product ALTER COLUMN id SET DEFAULT nextval('public.meal_product_id_seq'::regclass);


--
-- Name: meal_type id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal_type ALTER COLUMN id SET DEFAULT nextval('public.meal_type_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: meal_product PK_2def7fcded545544b0df3e0c86a; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal_product
    ADD CONSTRAINT "PK_2def7fcded545544b0df3e0c86a" PRIMARY KEY (id, "mealId", "productId");


--
-- Name: meal_type PK_7c4e585a0551696b23c43e40c47; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal_type
    ADD CONSTRAINT "PK_7c4e585a0551696b23c43e40c47" PRIMARY KEY (id);


--
-- Name: meal PK_ada510a5aba19e6bb500f8f7817; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: session PK_f55da76ac1c3ac420f444d2ff11; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY (id);


--
-- Name: product UQ_22cc43e9a74d7498546e9a63e77; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE (name);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_28c5d1d16da7908c97c9bc2f74; Type: INDEX; Schema: public; Owner: vlatko
--

CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON public.session USING btree ("expiredAt");


--
-- Name: product FK_329b8ae12068b23da547d3b4798; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: meal FK_419ad998c5e3b37a7cce0f872f5; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: meal_product FK_769d3e5caceede515715277c784; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal_product
    ADD CONSTRAINT "FK_769d3e5caceede515715277c784" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: meal_product FK_ad97c8c16a4ff39daaf8f464279; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal_product
    ADD CONSTRAINT "FK_ad97c8c16a4ff39daaf8f464279" FOREIGN KEY ("mealId") REFERENCES public.meal(id);


--
-- Name: meal FK_ffd56a30fec0a5ac3689c95f1a2; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT "FK_ffd56a30fec0a5ac3689c95f1a2" FOREIGN KEY ("mealTypeId") REFERENCES public.meal_type(id);


--
-- PostgreSQL database dump complete
--

