<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('roles-read')) {
            abort(401);
        }

        $roles = Role::get();

        return [
            'data' => $roles
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Laratrust::isAbleTo('roles-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:roles,name',
            'display_name' => 'required|string|unique:roles,display_name',
            'description' => 'nullable|string',
            'permissions' => 'array'
        ]);

        $role = Role::create($validated);
        $role->syncPermissions($validated['permissions']);

        return [
            'data' => $role
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        if (!Laratrust::isAbleTo('roles-read')) {
            abort(401);
        }

        $permissions = DB::table('permission_role')
            ->where('role_id', '=', $role->id)
            ->pluck('permission_id');

        return [
            'data' => $role,
            'permissions' => $permissions
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        if (!Laratrust::isAbleTo('roles-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id,
            'display_name' => 'required|string|unique:roles,display_name,' . $role->id,
            'description' => 'nullable|string',
            'permissions' => 'array'
        ]);

        $role->update($validated);
        $role->syncPermissions($validated['permissions']);

        return [
            'data' => $role
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        if (!Laratrust::isAbleTo('roles-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            DB::table('permission_role')
                ->where('role_id', '=', $role->id)
                ->delete();

            DB::table('role_user')
                ->where('role_id', '=', $role->id)
                ->delete();

            $role->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);

        }

        return;
    }
}
