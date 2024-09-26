<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('permissions-read')) {
            abort(401);
        }

        $permissions = Permission::orderBy('display_name')->get();

        return [
            'data' => $permissions
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
        if (!Laratrust::isAbleTo('permissions-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:permissions,name',
            'display_name' => 'required|string|unique:permissions,display_name',
            'description' => 'nullable|string',
        ]);

        $permission = Permission::create($validated);

        return [
            'data' => $permission
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        if (!Laratrust::isAbleTo('permissions-read')) {
            abort(401);
        }

        return [
            'data' => $permission
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        if (!Laratrust::isAbleTo('permissions-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $permission->id,
            'display_name' => 'required|string|unique:permissions,display_name,' . $permission->id,
            'description' => 'nullable|string',
        ]);

        $permission->update($validated);

        return [
            'data' => $permission
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        if (!Laratrust::isAbleTo('permissions-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            DB::table('permission_role')
                ->where('permission_id', '=', $permission->id)
                ->delete();

            DB::table('permission_user')
                ->where('permission_id', '=', $permission->id)
                ->delete();

            $permission->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
