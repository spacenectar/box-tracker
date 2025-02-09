from better_profanity import profanity

PROFANITY_WHITELIST = [
    "hell", "damn", "crap", "sucks", "freaking", "freakin", "freak", "frickin",
    "frick", "shiz", "shizz", "ass", "balls", "bimbo", "bimbos", "boob", "boobs",
    "bum", "dink", "dinks", "doofus", "douche", "dummy", "dyke", "dykes", "fanny",
    "fat", "fatass", "frig", "frigga", "gay", "gays", "homo", "jerk", "jerked",
    "junkie", "junkies", "moron", "nude", "nudes", "pimp", "pimps", "pot", "prick",
    "pricks", "queer", "queers", "rump", "sex", "sexy", "slutty", "tits", "titty",
    "twat", "wank", "wanker", "wankers", "weed"
]

profanity.load_censor_words(whitelist_words=PROFANITY_WHITELIST)

# Get the full blocklist from better_profanity and normalise the strings to lowercase
BLOCKLIST = {str(word).lower() for word in profanity.CENSOR_WORDSET}

def check_profanity(value: str) -> str:
    """Raise an error if the string contains profanity, including substrings."""
    lower_value = value.lower()  # Normalize input

    # Check full words first
    if profanity.contains_profanity(lower_value):
        raise ValueError("Bad language detected. Aborting.")

    # Check substrings
    for word in BLOCKLIST:
        if word in lower_value:
            raise ValueError("Bad language detected. Aborting.")

    return value
