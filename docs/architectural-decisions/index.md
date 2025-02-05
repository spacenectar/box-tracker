# Architectural Decisions Record (ADR)

This folder contains a record of all of the architectural decisions made by the
team.

Please reference this article for more information:

https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html

This record should be immutable. Please do not delete existing documents.

## How to add to this record

Copy an existing record file and rename it to `adr-[number].md`. Where `number`
is the number of the latest ADR + 1.

Complete the ADR record in accordance with the fields available. If this is a
decision you are making yourself or within the team, you can leave the status
at 'accepted', however if you are likely to need to merge this ADR in whilst
awaiting external approval, be sure to set the status to 'In review'.

Submit a merge request and address any feedback you may receive.

If you do require external approval, once the ADR has been approve/rejected,
please update the status accordingly.

## Updating a decision

Sometimes we need to update an existing decision. In this case, the original ADR
should not be modified, instead we should create a new ADR.

Once done, we need to change the original decisions status to 'superceded' and
underneath, add a link to the new decision. This way, we preserve a record of
all decisions that were made and reasons as to why they were superceded.
