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
-- Name: exercise; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.exercise (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "exerciseTypeId" integer NOT NULL,
    duration integer NOT NULL,
    intensity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.exercise OWNER TO vlatko;

--
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_id_seq OWNER TO vlatko;

--
-- Name: exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.exercise_id_seq OWNED BY public.exercise.id;


--
-- Name: exercise_type; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.exercise_type (
    id integer NOT NULL,
    name character varying NOT NULL,
    image character varying NOT NULL,
    calories integer NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.exercise_type OWNER TO vlatko;

--
-- Name: exercise_type_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.exercise_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_type_id_seq OWNER TO vlatko;

--
-- Name: exercise_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.exercise_type_id_seq OWNED BY public.exercise_type.id;


--
-- Name: glucose_level; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.glucose_level (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    level integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.glucose_level OWNER TO vlatko;

--
-- Name: glucose_level_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.glucose_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.glucose_level_id_seq OWNER TO vlatko;

--
-- Name: glucose_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.glucose_level_id_seq OWNED BY public.glucose_level.id;


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
-- Name: weight; Type: TABLE; Schema: public; Owner: vlatko
--

CREATE TABLE public.weight (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    weight integer NOT NULL,
    measure character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.weight OWNER TO vlatko;

--
-- Name: weight_id_seq; Type: SEQUENCE; Schema: public; Owner: vlatko
--

CREATE SEQUENCE public.weight_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.weight_id_seq OWNER TO vlatko;

--
-- Name: weight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vlatko
--

ALTER SEQUENCE public.weight_id_seq OWNED BY public.weight.id;


--
-- Name: exercise id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.exercise ALTER COLUMN id SET DEFAULT nextval('public.exercise_id_seq'::regclass);


--
-- Name: exercise_type id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.exercise_type ALTER COLUMN id SET DEFAULT nextval('public.exercise_type_id_seq'::regclass);


--
-- Name: glucose_level id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.glucose_level ALTER COLUMN id SET DEFAULT nextval('public.glucose_level_id_seq'::regclass);


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
-- Name: weight id; Type: DEFAULT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.weight ALTER COLUMN id SET DEFAULT nextval('public.weight_id_seq'::regclass);


--
-- Name: exercise_type PK_13e525267d44e7aa48ea8b26e56; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.exercise_type
    ADD CONSTRAINT "PK_13e525267d44e7aa48ea8b26e56" PRIMARY KEY (id);


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
-- Name: exercise PK_a0f107e3a2ef2742c1e91d97c14; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY (id);


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
-- Name: glucose_level PK_c4766efd4411f2eff3dc447a897; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.glucose_level
    ADD CONSTRAINT "PK_c4766efd4411f2eff3dc447a897" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: weight PK_d62a2bdd27e5c173f24c4c73a41; Type: CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.weight
    ADD CONSTRAINT "PK_d62a2bdd27e5c173f24c4c73a41" PRIMARY KEY (id);


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
-- Name: exercise FK_0600c3e625643c18323ede9ae02; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "FK_0600c3e625643c18323ede9ae02" FOREIGN KEY ("userId") REFERENCES public."user"(id);


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
-- Name: glucose_level FK_7316f720e08196c6ea27326b7b2; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.glucose_level
    ADD CONSTRAINT "FK_7316f720e08196c6ea27326b7b2" FOREIGN KEY ("userId") REFERENCES public."user"(id);


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
-- Name: exercise FK_d29c37565c416e4e6359fbbfc77; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "FK_d29c37565c416e4e6359fbbfc77" FOREIGN KEY ("exerciseTypeId") REFERENCES public.exercise_type(id);


--
-- Name: weight FK_ee9312aff6c9fd36e604ed57f50; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.weight
    ADD CONSTRAINT "FK_ee9312aff6c9fd36e604ed57f50" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: meal FK_ffd56a30fec0a5ac3689c95f1a2; Type: FK CONSTRAINT; Schema: public; Owner: vlatko
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT "FK_ffd56a30fec0a5ac3689c95f1a2" FOREIGN KEY ("mealTypeId") REFERENCES public.meal_type(id);


--
-- PostgreSQL database dump complete
--

