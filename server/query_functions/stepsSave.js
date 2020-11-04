module.exports = async (client, recipie_id, steps) => {
    //steps={newSteps,deleteSteps,updateSteps}
    let result = {};
    //create
    if (steps.newSteps) {
        let recipieIds = [];
        let count;
        for (count = 0; count < steps.newSteps.names.length; count++) {
            recipieIds.push(recipie_id);
        }
        const {
            durations,
            names,
            descriptions,
            order
        } = steps.newSteps;
        const newSteps =
            await client.query('INSERT INTO recipie_steps (recipie_id,duration,name,description,order_index)' +
                ' SELECT * FROM unnest($1::bigint[],$2::time[],$3::text[],$4::text[],$5::bigint[]) RETURNING *',
                [
                    recipieIds,
                    durations,
                    names,
                    descriptions,
                    order
                ]);
        result = {
            newSteps: newSteps.rows
        };
    }
    //update
    if (steps.updateSteps) {
        const {
            durations,
            names,
            descriptions,
            step_ids
        } = steps.updateSteps;
        const updateSteps =
            await client.query(
                'UPDATE recipie_steps SET' +
                ' duration=new_values.duration,' +
                ' name=new_values.name,' +
                ' description=new_values.description' +
                ' FROM (SELECT * FROM unnest($1::bigint[],$2::time[],$3::text[],$4::text[]))' +
                ' AS new_values(step_id,duration,name,description)' +
                ' WHERE new_values.step_id=recipie_steps.step_id RETURNING *',
                [
                    step_ids,
                    durations,
                    names,
                    descriptions
                ]);
        result = {
            ...result,
            updateSteps: updateSteps.rows
        }
    }
    //delete
    if (steps.deleteSteps) {
        const { step_ids } = steps.deleteSteps;
        const delteSteps =
            await client.query('DELETE FROM recipie_steps WHERE step_id' +
                ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING step_id',
                [
                    step_ids
                ]);
        result = {
            ...result,
            deleteSteps: delteSteps.rows
        }
    }
    return result;
}