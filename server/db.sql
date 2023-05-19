--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: comments; Type: TABLE; Schema: public; Owner: tpl1122_17
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    movie_review_id integer,
    comment_text text,
    user_id text,
    posted timestamp without time zone DEFAULT now()
);


ALTER TABLE public.comments OWNER TO tpl1122_17;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_17
--

ALTER TABLE public.comments ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: follow; Type: TABLE; Schema: public; Owner: tpl1122_17
--

CREATE TABLE public.follow (
    id integer NOT NULL,
    user_id text
);


ALTER TABLE public.follow OWNER TO tpl1122_17;

--
-- Name: follow_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_17
--

ALTER TABLE public.follow ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.follow_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: tpl1122_17
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    movie_id integer,
    star_rating integer,
    post text,
    title text,
    reviewers_user_id text
);


ALTER TABLE public.reviews OWNER TO tpl1122_17;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_17
--

ALTER TABLE public.reviews ALTER COLUMN review_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1122_17
--

CREATE TABLE public.users (
    user_id text NOT NULL,
    name text,
    email text,
    username text,
    picture text
);


ALTER TABLE public.users OWNER TO tpl1122_17;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: tpl1122_17
--

INSERT INTO public.comments (comment_id, movie_review_id, comment_text, user_id, posted) OVERRIDING SYSTEM VALUE VALUES (1, 2, 'dsgdhbdskfbkdf', 'google-oauth2|113398039539949185081', '2023-05-17 16:17:02.606127');
INSERT INTO public.comments (comment_id, movie_review_id, comment_text, user_id, posted) OVERRIDING SYSTEM VALUE VALUES (6, 8, 'Wow, "The Pope''s Exorcist" sounds like the perfect movie for when you''re in the mood for some demonic entertainment and holy action! Who needs rollercoasters when you can go on a thrill ride of exorcisms and demon-kicking? And forget about the Avengers, the real heroes are the Vatican''s secret demon-fighting team! It''s like a religious superhero movie, but instead of capes, they have cassocks. Sign me up for a front-row seat to see the devil get whacked like a mole!', 'google-oauth2|114190279385313681698', '2023-05-17 16:17:02.606127');
INSERT INTO public.comments (comment_id, movie_review_id, comment_text, user_id, posted) OVERRIDING SYSTEM VALUE VALUES (8, 8, 'rtrelhr;riktgyubfsdolihsdf', NULL, '2023-05-17 18:36:25.32271');


--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: tpl1122_17
--



--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: tpl1122_17
--

INSERT INTO public.reviews (review_id, movie_id, star_rating, post, title, reviewers_user_id) OVERRIDING SYSTEM VALUE VALUES (1, 804150, 6, 'If you''re looking for a movie that''s equal parts absurd, hilarious, and bizarre, then "Cocaine Bear" might just be the perfect movie for you. This movie tells the unbelievable true story of a bear who accidentally ingested over 70 pounds of cocaine, and then proceeded to have one wild and crazy night.

From the moment the bear snorts up the cocaine, the movie takes on a surreal and wacky tone, with the bear careening through the woods like a furry freight train. The bear''s antics are hilarious, and you''ll find yourself rooting for this unlikely hero as he stumbles through the forest, high as a kite.

But "Cocaine Bear" isn''t just a funny movie - it''s also a moving tale of one bear''s struggle with addiction, and the toll that drugs can take on even the wildest of creatures. By the end of the movie, you''ll be left feeling both amused and moved, and you''ll have a newfound respect for the power of nature, and the dangers of substance abuse.

So if you''re looking for a movie that''s equal parts absurd, hilarious, and surprisingly poignant, then "Cocaine Bear" is the perfect choice. Just be warned - after watching this movie, you might never look at a bear (or a line of cocaine) the same way again!', 'Too absurd to pass up!', 'google-oauth2|102433159214809060060');
INSERT INTO public.reviews (review_id, movie_id, star_rating, post, title, reviewers_user_id) OVERRIDING SYSTEM VALUE VALUES (8, 758323, 7, 'Well, if you''re looking for a movie that''s a holy rollercoaster of thrills and chills, then "The Pope''s Exorcist" is definitely worth a watch! Not only will you get to see a possessed person get their demon kicked to the curb, but you''ll also get a sneak peek into the Vatican''s secret demon-fighting team (which is way cooler than the Swiss Guard, if you ask me).

Plus, let''s be real, who doesn''t love a good exorcism? It''s like a really intense game of whack-a-mole, but instead of moles, you''re smacking the devil out of someone''s soul. So grab some popcorn, buckle up, and get ready for a religious experience that''ll have you saying "Hail Mary" in your sleep!', 'Hail Mary', 'google-oauth2|114190279385313681698');
INSERT INTO public.reviews (review_id, movie_id, star_rating, post, title, reviewers_user_id) OVERRIDING SYSTEM VALUE VALUES (2, 804150, 6, '
Well, let me tell you, if you''re looking for a movie that''s grounded in reality, makes sense, and doesn''t involve a bear on a drug-fueled rampage, then "Cocaine Bear" might not be the movie for you.

This movie is pure madness, from start to finish. It''s got bears, cocaine, and a whole lot of nonsense. If you''re not into that kind of thing, then you might want to steer clear of this one.

And let''s be real - if you''re looking for a movie with nuanced characters, complex plotlines, and a deep exploration of the human condition, then "Cocaine Bear" probably isn''t the movie for you either. This is a movie about a bear that gets high on cocaine, for goodness sake!

So, if you''re looking for a movie that''s serious, thought-provoking, and grounded in reality, then "Cocaine Bear" might not be the movie for you. But if you''re looking for a movie that''s ridiculous, over-the-top, and just plain wacky, then buckle up and get ready for the ride of your life!', 'This Movie is Crazy', 'google-oauth2|113398039539949185081');
INSERT INTO public.reviews (review_id, movie_id, star_rating, post, title, reviewers_user_id) OVERRIDING SYSTEM VALUE VALUES (9, 493529, 7, 'Ah, dear adventurer! Are you ready to embark on a journey filled with mythical creatures, legendary heroes, and an action-packed adventure? Then the new Dungeons and Dragons movie is just the ticket you need! It''s a cinematic masterpiece that will take you on an epic quest full of drama, suspense, and unforgettable characters.

With the incredible visuals and a star-studded cast, this movie promises to be a rollercoaster ride of excitement, where magic meets fantasy. You''ll be transported to a world of dragons, wizards, and epic battles, where you''ll be on the edge of your seat the entire time.

So, what are you waiting for? Gather your party and ready your popcorn, and let the adventure begin!', 'Adventure Awaits', 'google-oauth2|113398039539949185081');
INSERT INTO public.reviews (review_id, movie_id, star_rating, post, title, reviewers_user_id) OVERRIDING SYSTEM VALUE VALUES (10, 76600, 10, 'Avatar: The Way of Water is a cinematic masterpiece that takes us on a visually stunning journey to a world beyond our own. From the breathtaking landscapes to the intricate details of the Na''vi culture, every aspect of this film is a true work of art.

The story is as compelling as it is heartwarming, following the adventures of a young Na''vi girl who must navigate a dangerous new world to protect her people and their way of life. The themes of love, sacrifice, and environmentalism are expertly woven throughout the film, leaving a lasting impact on the viewer.

The special effects are truly awe-inspiring, with groundbreaking advancements in motion capture technology bringing the Na''vi and their world to life in an unprecedented way. The film is a true testament to the power of cinema, transporting us to a world of wonder and imagination.

Overall, Avatar: The Way of Water is an absolute must-see for anyone who loves epic adventure, stunning visuals, and a deeply moving story. It is a true masterpiece that will leave you feeling inspired and uplifted long after the credits have rolled.', 'Watch It', 'google-oauth2|113398039539949185081');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1122_17
--

INSERT INTO public.users (user_id, name, email, username, picture) VALUES ('google-oauth2|114190279385313681698', 'Anneice Manzanares', 'mountains.stars@gmail.com', 'mountains.stars', 'https://lh3.googleusercontent.com/a/AGNmyxY-pbyYaE3CEsUH8_ZrqVgxnls6JIqvIxxPHiAu=s96-c');
INSERT INTO public.users (user_id, name, email, username, picture) VALUES ('google-oauth2|102433159214809060060', 'Anneice Manzanares', 'anneice.manzanares@gmail.com', 'anneice.manzanares', NULL);
INSERT INTO public.users (user_id, name, email, username, picture) VALUES ('google-oauth2|113398039539949185081', 'Anneice Manzanares', '3littleapples@gmail.com', '3littleapples', NULL);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_17
--

SELECT pg_catalog.setval('public.comments_id_seq', 9, true);


--
-- Name: follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_17
--

SELECT pg_catalog.setval('public.follow_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_17
--

SELECT pg_catalog.setval('public.reviews_id_seq', 12, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: comments comments_review_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_review_id_fkey FOREIGN KEY (movie_review_id) REFERENCES public.reviews(review_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_17
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (reviewers_user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

